<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/coinbase/onchainkit/main/site/docs/public/logo/v0-27.png">
    <img alt="OnchainKit logo vibes" src="https://raw.githubusercontent.com/coinbase/onchainkit/main/site/docs/public/logo/v0-27.png" width="auto">
  </picture>
</p>

# Basename Expiration Checker

The [Basename Expiration Checker] is a web application designed to solve a common problem faced by Basename holders. Many people who own Basenames often struggle to remember or easily find out when their Basename expires. Additionally, most users are not familiar with using the [Basescan] block explorer to query the contract for this information. Even when they do manage to retrieve the expiration data, it's typically presented in UNIX time (a large integer), which isn't human-readable.

Our project addresses these issues by providing a simple, user-friendly interface where users can input their Basename token ID and receive the expiration date in a clear, human-readable format. This tool eliminates the need for users to interact directly with the blockchain or decipher complex timestamp data.

Built with the OnchainKit App template, this project leverages the `<FrameMetadata />` component from OnchainKit to enhance its functionality and user experience.

## Technology Stack

This project is built using a modern web development stack, focusing on blockchain interaction and user interface design:

- **Viem**: A TypeScript library for interacting with Ethereum, providing low-level stateless primitives for interacting with Ethereum.
- **Wagmi**: A collection of React Hooks for Ethereum, making it easy to "Connect Wallet" and display ENS and balance information.
- **OnchainKit**: Provides the app template and the `<FrameMetadata />` component, enhancing the project's blockchain integration capabilities.
- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **TypeScript**: Adds static typing to JavaScript, enhancing developer productivity and code quality.

By combining these technologies, we've created a robust, efficient, and user-friendly tool for Basename holders to easily check their expiration dates.

<br />

## Setup

To ensure all components work seamlessly, set the following environment variables in your `.env` file using `.local.env.example` as a reference.

You can find the API key on the [Coinbase Developer Portal's OnchainKit page](https://portal.cdp.coinbase.com/products/onchainkit). If you don't have an account, you will need to create one.

You can find your Wallet Connector project ID at [Wallet Connect](https://cloud.walletconnect.com).

```sh
# See https://portal.cdp.coinbase.com/products/onchainkit
NEXT_PUBLIC_CDP_API_KEY="GET_FROM_COINBASE_DEVELOPER_PLATFORM"

# See https://cloud.walletconnect.com
NEXT_PUBLIC_WC_PROJECT_ID="GET_FROM_WALLET_CONNECT"
```

<br />

## Locally run

```sh
# Install bun in case you don't have it
bun curl -fsSL <https://bun.sh/install> | bash

# Install packages
bun i

# Run Next app
bun run dev
```

<br />

## Resources

- [OnchainKit documentation](https://onchainkit.xyz)

<br />

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
