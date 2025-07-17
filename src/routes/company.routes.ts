import { Router } from 'express';
import { getCompanies, createCompany, updateCompany } from '../controllers/company.controller';

const router = Router();

router.get('/', getCompanies);
router.post('/', createCompany);
router.put('/:id', updateCompany);

export default router;
