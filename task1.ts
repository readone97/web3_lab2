const SECRET_KEY = [
    15, 93, 176, 40, 82, 234, 52, 254, 172, 156, 69,
    42, 2, 132, 20, 64, 197, 193, 215, 205, 51, 160,
    38, 254, 47, 237, 238, 38, 85, 154, 16, 230, 40,
    126, 33, 147, 46, 216, 55, 166, 84, 12, 42, 198,
    89, 185, 218, 147, 91, 215, 207, 166, 75, 13, 127,
    252, 38, 153, 160, 177, 205, 132, 112, 69,
  ];
  
  const secretKeyHexString = SECRET_KEY
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  
  import { Keypair,  Connection,Transaction,SystemProgram,sendAndConfirmTransaction,PublicKey, } from "@solana/web3.js";
  import { airdropIfRequired } from "@solana-developers/helpers";
  import * as web3 from "@solana/web3.js";
  
  // Create keypair from secret key
  const sender_Keypair = Keypair.fromSecretKey(Buffer.from(secretKeyHexString, "hex"));
  
  console.log(
    `✅ Finished! We've loaded our secret key securely!`,
  );
  


  const suppliedToPubkey = process.argv[2] || null;
   
  if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
  }

  const senderKeypair = sender_Keypair;
   
  console.log(`suppliedToPubkey: ${suppliedToPubkey}`);
   
  const toPubkey = new PublicKey(suppliedToPubkey);

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
   
  console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
  );
 

const transaction = new Transaction();
 
const LAMPORTS_TO_SEND = 5000;
 
const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});
 
transaction.add(sendSolInstruction);
 
const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeypair,
]);

 
console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
);
console.log(`Transaction signature is ${signature}!`);

  