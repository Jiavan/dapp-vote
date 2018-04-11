var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
// abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
$.getJSON('./Voting.json', function (res) {
    var abi = res.abi;
    var VotingContract = web3.eth.contract(abi);
    // In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
    var contractInstance = VotingContract.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10');
    var candidates = { 'Rama': 'candidate-1', 'Nick': 'candidate-2', 'Jose': 'candidate-3' };

    function voteForCandidate() {
        var candidateName = $('#candidate').val();
        contractInstance.voteForCandidate(candidateName, { from: web3.eth.accounts[0] }, function () {
            let div_id = candidates[candidateName];
            $('#' + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
        });
    }

    candidateNames = Object.keys(candidates);
    for (var i = 0; i < candidateNames.length; i++) {
        let name = candidateNames[i];
        let val = contractInstance.totalVotesFor.call(name).toString()
        $('#' + candidates[name]).html(val);
    }

    $('.vote').on('click', voteForCandidate);
});