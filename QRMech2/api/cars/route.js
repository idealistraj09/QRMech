import { getMongoDb } from '@/api-lib/mongodb';

export async function POST(request){
    const carmodelname = await request.json();
    await getMongoDb();
}