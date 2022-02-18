require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/SaYgw4dXvs0KnjN5jhLjOS0mJkFn9unC',
      accounts: [
        'c945cc4ebcfe1193bf4d6952ce829757b4d773c70f802668b1391aaae361de3d'
      ]
    }
  }
};
