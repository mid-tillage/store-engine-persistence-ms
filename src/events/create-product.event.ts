export class CreateProductEvent {
    product?: {
        idProduct: number | null;
        name: string;
        description: string;
        enterprise?: {
            idEnterprise: number | null;
            name: string;
        };
    };
}