import * as anchor from "@coral-xyz/anchor";
//import { Program } from "@coral-xyz/anchor";
//import { Mycalculatordapp } from "../target/types/mycalculatordapp";
import { SystemProgram } from "@solana/web3.js";
import {assert} from "chai";

// js imports
// const assert = require('assert');
// const anchor = require('@coral-xyz/anchor');
// const {SystemProgram} = anchor.web3;

describe("mycalculatordapp",()=>{
    const provider= anchor.getProvider();
    anchor.setProvider(provider);
    const calculator=anchor.web3.Keypair.generate();
    const program=anchor.workspace.Mycalculatordapp;

    it("creates a calculator dapp", async ()=>{
        await program.rpc.create("welcome to solana",{
            accounts:{
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers:[calculator]
        });
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.greeting == "welcome to solana")
    })

    it("perform add operation on a calculator dapp", async ()=>{
        await program.rpc.add(new anchor.BN(2), new anchor.BN(3),{
            accounts:{
                calculator: calculator.publicKey,
            }
        });
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(5)));
    })

    it("perform subtraction operation on a calculator dapp", async ()=>{
        await program.rpc.sub(new anchor.BN(52), new anchor.BN(3),{
            accounts:{
                calculator: calculator.publicKey,
            }
        });
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(49)));
    })

    it("perform multiply operation on a calculator dapp", async ()=>{
        await program.rpc.mul(new anchor.BN(12), new anchor.BN(3),{
            accounts:{
                calculator: calculator.publicKey,
            }
        });
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(36)));
    })

    it("perform division operation on a calculator dapp", async ()=>{
        await program.rpc.divide(new anchor.BN(11), new anchor.BN(3),{
            accounts:{
                calculator: calculator.publicKey,
            }
        });
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.remainder.eq(new anchor.BN(2)));
        assert.ok(account.result.eq(new anchor.BN(3)));
    })
})