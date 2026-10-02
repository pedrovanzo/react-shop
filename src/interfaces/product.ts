export default interface ProductInterface {
    id: string,
    name: string,
    description?: string,
    heroImage?: string,
    interactions?: InteractionsInterface[]
}
interface InteractionsInterface {
    interaction?: string
}