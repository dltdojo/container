
import MyToken from '../build/contracts/MyToken.json'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
const myToken = contract(MyToken)

function init(w) {
    var provider = new Web3.providers.HttpProvider("http://192.168.2.106:8545")
    myToken.setProvider(provider)
    w.web3 = new Web3(provider)
    return w.web3
}

function getHello(s) {
    s.hello = 'MyToken'
}

function getAccount(web3) {
    let account = web3.eth.accounts[0]
    console.log(account)
    return account
}

// 
function getBalance(account) {
   return myToken.deployed().then(function(instance) {
      return instance.balanceOf(account);
    }).then(function(balance) {
      return balance.valueOf()
    });
}

function myController($scope, $http, $window) {
    let web3 = init($window)
    getHello($scope)
    let account = getAccount(web3)
    $scope.account = account
    getBalance(account).then((balance)=>{
        $scope.balance = balance;
        $scope.$apply();
    })
}

let ngModule = angular.module('myApp', [])
ngModule.controller("MyController", ["$scope", "$http", "$window", myController])