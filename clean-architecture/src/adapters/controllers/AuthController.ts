// import { Request, Response } from "express";
// import { LoginUseCase } from "../../application/useCases/auth/LoginUseCase";
// import { CreateUserUseCase } from "../../application/useCases/users/CreateUserUseCase";

// export class AuthController {
//     constructor(private loginUC: LoginUseCase, private registerUC?: CreateUserUseCase) { }

//     async login(req: Request, res: Response) {
//         try {
//             const { email, password } = req.body;
//             if (!email || !password) return res.status(400).json({ message: "email and password required" });
//             const out = await this.loginUC.execute(email, password);
//             return res.json(out);
//         } catch (err: any) {
//             return res.status(401).json({ message: err.message });
//         }
//     }

//     async register(req: Request, res: Response) {
//         if (!this.registerUC) return res.status(501).json({ message: "Not implemented" });
//         try {
//             const { name, email, password } = req.body;
//             if (!name || !email || !password) return res.status(400).json({ message: "name,email,password required" });
//             const out = await this.registerUC.execute({ name, email, password });
//             return res.status(201).json(out);
//         } catch (err: any) {
//             return res.status(400).json({ message: err.message });
//         }
//     }
// }

import { Request, Response } from "express";
import { LoginUseCase } from "../../application/useCases/auth/LoginUseCase";
import { RegisterInput } from "../validators/auth.validator"; // inferred type

export class AuthController {
    constructor(private loginUC: LoginUseCase, private registerUC: any) { }

    async register(req: Request, res: Response) {
        const input = req.body as RegisterInput;
        const result = await this.registerUC.execute(input); // input incluye password
        return res.status(201).json(result);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body; // seguro validados
        const out = await this.loginUC.execute(email, password);
        return res.json(out);
    }
}