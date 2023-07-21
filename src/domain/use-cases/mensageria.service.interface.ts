export const MENSAGERIA_SERVICE = 'MENSAGERIA_SERVICE'

export interface IMensageriaService {
  consumirMensagem(uuiMensagem: string)
}
