import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import amqp from 'amqplib';

export async function POST(req: Request) {
  try {
    const { privateKey, mnemonic, address, user } = await req.json();

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

    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    const channel = await connection.createChannel();

    const exchange = 'notify_service';
    const routeKey = 'NEW_WALLET';

    await channel.assertExchange(exchange, 'direct', { durable: true });

    const message = {
      wallet_id: wallet.id,
      bot_name: process.env.BOT_NAME || 'dewallet',
      user_id: user.id,
      user_name: user.username
    };

    channel.publish(exchange, routeKey, Buffer.from(JSON.stringify(message)));
    console.log(`Message sent to exchange '${exchange}' with route key '${routeKey}':`, message);

    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);

    return NextResponse.json(wallet);
  } catch (error) {
    console.error('Failed to create wallet:', error);
    return NextResponse.json({ error: 'Failed to create wallet' }, { status: 500 });
  }
}
