export default interface ProductInterface {
    name: string,
    description?: string,
    heroImage?: string,
    interactions?: InteractionsInterface[]
}
interface InteractionsInterface {
    interaction?: string
}