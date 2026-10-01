import {Router} from 'express';
import {body} from 'express-validator';
import {createAccount, getUser, login} from "./handlers";
import {handleInputErrors} from "./middlewares/validation";
import {authenticated} from "./middlewares/auth";

const router = Router();

//Auth
router.post('/auth/register',
    body('handle').notEmpty().withMessage('El handle es obligatorio'),
    body('email').notEmpty().withMessage('El email es obligatorio'),
    body('email').isEmail().withMessage('El email no es valido'),
    body('password').notEmpty().withMessage('El password es obligatorio'),
    body('password').isLength({min: 8}).withMessage('El password debe de ser de al menos 8 caracteres de largo'),
    handleInputErrors,
    createAccount
);

router.post('/auth/login',
    body('email').notEmpty().withMessage('El email es obligatorio'),
    body('email').isEmail().withMessage('El email no es valido'),
    body('password').notEmpty().withMessage('El password es obligatorio'),
    handleInputErrors,
    login
);

router.get('/user', authenticated, getUser);

export default router;
