import { Router } from 'express';
import * as usersApp from '../controllers/usersApp.controller';


export const router = Router();

router.get('/userTypes/:id/userApp', usersApp.getUsersAppByUserTypeId);
router.get('/userApp/:id', usersApp.getUsersAppById);
router.delete('/userApp/:id', usersApp.deleteUsersApp);
router.post('/userTypes/:id/userApp', usersApp.createNewUsersApp);
router.put('/userApp/:id', usersApp.updateUsersApp);
