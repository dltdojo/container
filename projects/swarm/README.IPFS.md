* https://github.com/dltdojo/container/tree/master/projects/ipfs
* https://github.com/dltdojo/container/tree/master/projects/swarm

節點上傳一個檔案自動散佈到其他節點

* ipfs需要每個節點進行pin add來得到同一檔案
* ipfs-cluster用ipfs-cluster-ctl peers add加入節點可同步檔案
* ethereum swarm利用enode url加入節點上傳即同步到其他同一個網路節點

可能問題

* ipfs-cluster是0.0.1版本測試概念階段
* ethereum swarm只是測試概念版本階段