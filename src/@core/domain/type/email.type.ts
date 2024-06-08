export type Email = {
    from?: string;
    to: string | string[];
    subject: string;
    data: any;
}