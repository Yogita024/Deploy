import express from 'express';
import { savesentEmail ,getEmails,moveEmailsToBin,toggleStarredEmails,deleteEmails} from '../controller/email-controller.js';

const routes=express.Router();

routes.post('/save',savesentEmail); 
routes.get('/emails/:type',getEmails);
routes.post('/save-draft',savesentEmail);
routes.post('/bin',moveEmailsToBin);
routes.post('/starred',toggleStarredEmails);
routes.delete('/delete',deleteEmails);
export default routes;
