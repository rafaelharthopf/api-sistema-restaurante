import { Router } from 'express';
import { getCompanies, createCompany } from '../controllers/company.controller';

const router = Router();

router.get('/', getCompanies);
router.post('/', createCompany);

export default router;
