import { z } from 'zod';

export const usuarioSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  senha: z.string().min(8).refine((value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(value), {
    message: 'Senha muito fraca!',
    path: ["senha"],
  }),
  confirma_senha: z.string().refine((data) => data.senha === data.confirma_senha, {
    message: "As senhas não são iguais!",
    path: ["confirma_senha"],
  }),
});
