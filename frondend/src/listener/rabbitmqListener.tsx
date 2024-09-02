import amqp, { ConsumeMessage } from 'amqplib';

async function listenForMutantRecords(): Promise<void> {
    const queue: string = 'req-mutant-record';
    const routingKey: string = 'req-mutant-record-rout-key';

    const connection: amqp.Connection = await amqp.connect('amqp://localhost');
    const channel: amqp.Channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    await channel.bindQueue(queue, 'your_exchange_name', routingKey);

    channel.consume(queue, (msg: ConsumeMessage | null) => {
        if (msg !== null) {
            const mutantRecord = JSON.parse(msg.content.toString());
            console.log('Received mutant record:', mutantRecord);
            // Process the mutant record as needed
            channel.ack(msg);
        }
    });
}

listenForMutantRecords().catch(console.error);