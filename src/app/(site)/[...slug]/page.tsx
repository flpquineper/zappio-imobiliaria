import { notFound } from 'next/navigation'

// URLs que não batem com nenhuma rota caem aqui para usar a 404 do site (com cabeçalho e rodapé),
// em vez da 404 padrão do Next, que fica em inglês e sem o layout: o app tem dois layouts raiz (site e painel).
export default function CatchAllNotFound() {
  notFound()
}
