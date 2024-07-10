import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { privateKey, mnemonic, address } = await req.json();

    const wallet = await prisma.wallet.create({
      data: {
        address,
        private_key: privateKey,
        mnemonic: mnemonic.phrase,
        network: 'TON',
        received: true,
        updatedAt: new Date()
      },
    });

    return NextResponse.json(wallet);
  } catch (error) {
    console.error('Failed to import wallet:', error);
    return NextResponse.json({ error: 'Failed to import wallet' }, { status: 500 });
  }
}