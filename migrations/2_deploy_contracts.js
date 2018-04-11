var Voting = artifacts.require('Voting');

module.exports = function(deployer) {
    deployer.deploy(Voting, ['Rama', 'Nick', 'Jose'], {gas: 6700000});
};