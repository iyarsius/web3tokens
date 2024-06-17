<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@iyarsius/web3tokens](./web3tokens.md) &gt; [IERC20FlashMint](./web3tokens.ierc20flashmint.md) &gt; [maxFlashLoan](./web3tokens.ierc20flashmint.maxflashloan.md)

## IERC20FlashMint.maxFlashLoan() method

Get the maximum amount of tokens available for loan.

**Signature:**

```typescript
maxFlashLoan(token: string): Promise<number>;
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

token


</td><td>

string


</td><td>


</td></tr>
</tbody></table>
**Returns:**

Promise&lt;number&gt;

a `ContractOperation` instance.


NOTE: this function does not consider any form of supply cap.
