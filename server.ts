import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, seedData, UserModel, TenderModel, BidModel, NotificationModel, AuditLogModel, EnquiryModel } from './server/db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolvePath(pathStr: string, idParam?: string): { model: any; idField: string; docId?: string; baseFilter: any } {
  const p = pathStr.replace(/^\/|\/$/g, '');
  const parts = p.split('/');

  if (parts[0] === 'users') {
    return {
      model: UserModel,
      idField: 'uid',
      docId: parts[1] || idParam,
      baseFilter: {}
    };
  }
  if (parts[0] === 'tenders') {
    if (parts[2] === 'bids') {
      return {
        model: BidModel,
        idField: 'id',
        docId: parts[3] || idParam,
        baseFilter: { tenderId: parts[1] }
      };
    }
    return {
      model: TenderModel,
      idField: 'id',
      docId: parts[1] || idParam,
      baseFilter: {}
    };
  }
  if (parts[0] === 'notifications') {
    return {
      model: NotificationModel,
      idField: 'id',
      docId: parts[1] || idParam,
      baseFilter: {}
    };
  }
  if (parts[0] === 'auditLogs') {
    return {
      model: AuditLogModel,
      idField: 'id',
      docId: parts[1] || idParam,
      baseFilter: {}
    };
  }
  if (parts[0] === 'enquiries') {
    return {
      model: EnquiryModel,
      idField: 'id',
      docId: parts[1] || idParam,
      baseFilter: {}
    };
  }
  throw new Error(`Unsupported path: ${pathStr}`);
}

async function validateUserData(pathStr: string, id: string, data: any, isPartial: boolean) {
  const p = pathStr.replace(/^\/|\/$/g, '');
  const parts = p.split('/');
  
  if (parts[0] !== 'users') {
    return;
  }

  const { model, idField } = resolvePath(pathStr, id);
  let existingUser: any = null;
  
  if (isPartial || !data.role) {
    try {
      existingUser = await model.findOne({ [idField]: id }).exec();
      if (existingUser && typeof existingUser.toObject === 'function') {
        existingUser = existingUser.toObject();
      }
    } catch (e) {
      console.error('Error fetching existing user in validation:', e);
    }
  }

  const role = data.role || (existingUser ? existingUser.role : undefined);

  if (role === 'vendor') {
    const merged = existingUser ? { ...existingUser, ...data } : { ...data };

    const companyName = merged.companyName;
    const phone = merged.phone;
    const gst = merged.gstNumber || merged.gstin;
    const licenseUrl = merged.licenseUrl;

    if (!companyName || typeof companyName !== 'string' || !companyName.trim()) {
      throw new Error('Company name is required for vendors');
    }
    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      throw new Error('Phone number is required for vendors');
    }
    if (!gst || typeof gst !== 'string' || !gst.trim()) {
      throw new Error('GST number/GSTIN is required for vendors');
    }
    if (!licenseUrl || typeof licenseUrl !== 'string' || !licenseUrl.trim()) {
      throw new Error('Company License or IOC Certificate is required for vendors');
    }

    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gstRegex.test(gst.trim().toUpperCase())) {
      throw new Error('Invalid GSTIN format (e.g. 29AAAAA1111A1Z1)');
    }
  }
}

async function startServer() {
  await connectDB();

  const app = express();
  const PORT = process.env.PORT || 3003;
  const server = http.createServer(app);

  app.use(express.json());

  // Middleware to check DB status for API routes
  app.use('/api/db', (req, res, next) => {
    // If request is seed or DB is connected, proceed. Otherwise return 503 for fallback
    const isConnected = (UserModel.db as any).readyState === 1;
    if (!isConnected && req.path !== '/seed') {
      return res.status(503).send('Database not connected. Operating in Client-Side Fallback mode.');
    }
    next();
  });

  // --- DATABASE API ROUTES ---
  
  async function getUserProfile(req: express.Request) {
    const uid = req.headers['x-user-uid'];
    if (!uid || typeof uid !== 'string') return null;
    try {
      const user = await UserModel.findOne({ uid }).exec();
      return user;
    } catch (error) {
      console.error('Error fetching user profile in database proxy:', error);
      return null;
    }
  }

  app.get('/api/db', async (req, res) => {
    try {
      const { path: pathStr, id } = req.query as { path: string; id?: string };
      if (!pathStr) return res.status(400).send('Path is required');
      
      const { model, idField, docId } = resolvePath(pathStr, id);
      if (!docId) return res.status(400).send('Doc ID is required');

      const doc = await model.findOne({ [idField]: docId }).exec();

      // Access Control: Validate department access for tenders
      if (pathStr === 'tenders' && doc) {
        const userProfile = await getUserProfile(req);
        if (userProfile && userProfile.role !== 'admin') {
          const userDept = userProfile.department || 'civil';
          if (doc.department !== userDept) {
            return res.status(403).send('Access Denied: You do not have permission to access tenders from this department');
          }
        }
      }

      res.json(doc);
    } catch (error: any) {
      console.error('Error fetching doc:', error);
      res.status(500).send(error.message);
    }
  });

  app.post('/api/db/query', async (req, res) => {
    try {
      const { path: pathStr, isCollectionGroup, constraints } = req.body as {
        path: string;
        isCollectionGroup: boolean;
        constraints: any[];
      };
      
      if (!pathStr) return res.status(400).send('Path is required');

      let model: any;
      let baseFilter: any = {};

      if (isCollectionGroup) {
        if (pathStr === 'bids') {
          model = BidModel;
        } else {
          return res.status(400).send(`Unsupported collection group: ${pathStr}`);
        }
      } else {
        const resolved = resolvePath(pathStr);
        model = resolved.model;
        baseFilter = resolved.baseFilter;
      }

      const queryObj = { ...baseFilter };

      if (constraints && Array.isArray(constraints)) {
        constraints.forEach((c: any) => {
          if (c.type === 'where') {
            const { field, op, value } = c;
            if (op === '==') {
              queryObj[field] = value;
            } else if (op === '!=') {
              queryObj[field] = { $ne: value };
            } else if (op === '>') {
              queryObj[field] = { $gt: value };
            } else if (op === '<') {
              queryObj[field] = { $lt: value };
            } else if (op === '>=') {
              queryObj[field] = { $gte: value };
            } else if (op === '<=') {
              queryObj[field] = { $lte: value };
            }
          }
        });
      }

      // Access Control: Restrict queries on tenders to the user's department
      if (pathStr === 'tenders') {
        const userProfile = await getUserProfile(req);
        if (userProfile && userProfile.role !== 'admin') {
          const userDept = userProfile.department || 'civil';
          queryObj['department'] = userDept;
        }
      }

      let query = model.find(queryObj);

      const sortObj: any = {};
      let hasSort = false;
      if (constraints && Array.isArray(constraints)) {
        constraints.forEach((c: any) => {
          if (c.type === 'orderBy') {
            hasSort = true;
            sortObj[c.field] = c.direction === 'desc' ? -1 : 1;
          }
        });
      }

      if (hasSort) {
        query = query.sort(sortObj);
      } else {
        query = query.sort({ createdAt: -1, timestamp: -1 });
      }

      if (constraints && Array.isArray(constraints)) {
        constraints.forEach((c: any) => {
          if (c.type === 'limit') {
            query = query.limit(c.n);
          }
        });
      }

      const docs = await query.exec();
      res.json(docs);
    } catch (error: any) {
      console.error('Error querying docs:', error);
      res.status(500).send(error.message);
    }
  });

  app.post('/api/db', async (req, res) => {
    try {
      const { path: pathStr, id, data } = req.body as { path: string; id: string; data: any };
      if (!pathStr || !id || !data) return res.status(400).send('Path, id, and data are required');

      // Access Control: Validate department for creating tenders
      if (pathStr === 'tenders') {
        const userProfile = await getUserProfile(req);
        if (userProfile && userProfile.role !== 'admin') {
          const userDept = userProfile.department || 'civil';
          if (data.department !== userDept) {
            return res.status(403).send('Access Denied: You do not have permission to create tenders in another department');
          }
        }
      }

      try {
        await validateUserData(pathStr, id, data, false);
      } catch (validationErr: any) {
        return res.status(400).send(validationErr.message);
      }

      const { model, idField } = resolvePath(pathStr);
      const newDoc = new model({
        ...data,
        [idField]: id
      });
      await newDoc.save();
      res.json({ id });
    } catch (error: any) {
      console.error('Error creating doc:', error);
      res.status(500).send(error.message);
    }
  });

  app.put('/api/db', async (req, res) => {
    try {
      const { path: pathStr, id, data } = req.body as { path: string; id: string; data: any };
      if (!pathStr || !id || !data) return res.status(400).send('Path, id, and data are required');

      // Access Control: Validate department for updating/replacing tenders
      if (pathStr === 'tenders') {
        const userProfile = await getUserProfile(req);
        if (userProfile && userProfile.role !== 'admin') {
          const userDept = userProfile.department || 'civil';
          const existingTender = await TenderModel.findOne({ id }).exec();
          if (existingTender && existingTender.department !== userDept) {
            return res.status(403).send('Access Denied: You do not have permission to modify tenders from another department');
          }
          if (data.department && data.department !== userDept) {
            return res.status(403).send('Access Denied: You cannot assign a tender to another department');
          }
        }
      }

      try {
        await validateUserData(pathStr, id, data, false);
      } catch (validationErr: any) {
        return res.status(400).send(validationErr.message);
      }

      const { model, idField } = resolvePath(pathStr, id);
      const updatedDoc = await model.findOneAndUpdate(
        { [idField]: id },
        { ...data, [idField]: id },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).exec();
      res.json(updatedDoc);
    } catch (error: any) {
      console.error('Error setting doc:', error);
      res.status(500).send(error.message);
    }
  });

  app.patch('/api/db', async (req, res) => {
    try {
      const { path: pathStr, id, data } = req.body as { path: string; id: string; data: any };
      if (!pathStr || !id || !data) return res.status(400).send('Path, id, and data are required');

      // Access Control: Validate department for patching tenders
      if (pathStr === 'tenders') {
        const userProfile = await getUserProfile(req);
        if (userProfile && userProfile.role !== 'admin') {
          const userDept = userProfile.department || 'civil';
          const existingTender = await TenderModel.findOne({ id }).exec();
          if (existingTender && existingTender.department !== userDept) {
            return res.status(403).send('Access Denied: You do not have permission to modify tenders from another department');
          }
          if (data.department && data.department !== userDept) {
            return res.status(403).send('Access Denied: You cannot assign a tender to another department');
          }
        }
      }

      try {
        await validateUserData(pathStr, id, data, true);
      } catch (validationErr: any) {
        return res.status(400).send(validationErr.message);
      }

      const { model, idField } = resolvePath(pathStr, id);
      const updatedDoc = await model.findOneAndUpdate(
        { [idField]: id },
        { $set: data },
        { new: true }
      ).exec();
      res.json(updatedDoc);
    } catch (error: any) {
      console.error('Error updating doc:', error);
      res.status(500).send(error.message);
    }
  });

  app.delete('/api/db', async (req, res) => {
    try {
      const { path: pathStr, id } = req.body as { path: string; id: string };
      if (!pathStr || !id) return res.status(400).send('Path and id are required');

      // Access Control: Validate department for deleting tenders
      if (pathStr === 'tenders') {
        const userProfile = await getUserProfile(req);
        if (userProfile && userProfile.role !== 'admin') {
          const userDept = userProfile.department || 'civil';
          const existingTender = await TenderModel.findOne({ id }).exec();
          if (existingTender && existingTender.department !== userDept) {
            return res.status(403).send('Access Denied: You do not have permission to delete tenders from another department');
          }
        }
      }

      const { model, idField } = resolvePath(pathStr, id);
      await model.findOneAndDelete({ [idField]: id }).exec();
      res.json({ success: true });
    } catch (error: any) {
      console.error('Error deleting doc:', error);
      res.status(500).send(error.message);
    }
  });

  app.post('/api/db/seed', async (req, res) => {
    try {
      await seedData();
      res.json({ success: true });
    } catch (error: any) {
      console.error('Error seeding db manually:', error);
      res.status(500).send(error.message);
    }
  });

  // Vite Middleware for Development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: { server } },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`> Server ready at http://localhost:${PORT}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n> ERROR: Port ${PORT} is already in use.`);
      console.error(`> Run this command to free it, then try again:\n`);
      console.error(`>   npx kill-port ${PORT}\n`);
      process.exit(1);
    } else {
      throw err;
    }
  });
}

startServer();
