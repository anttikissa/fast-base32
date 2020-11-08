import test from 'ava'
import { decode } from './decode.js'

test('decode', (t) => {
	function checkDecode(input, output) {
		t.deepEqual(input, decode(output))
	}

	checkDecode(Buffer.of(0), '00')
	checkDecode(Buffer.of(0, 0), '0000')
	checkDecode(Buffer.of(0, 0, 0), '00000')
	checkDecode(Buffer.of(0, 0, 0, 0), '0000000')
	checkDecode(Buffer.of(0, 0, 0, 0, 0), '00000000')
	checkDecode(Buffer.of(0, 0, 0, 0, 0, 0), '0000000000')

	checkDecode(Buffer.of(0xff), 'zw')
	checkDecode(Buffer.of(0xff, 0xff), 'zzzg')
	checkDecode(Buffer.of(0xff, 0xff, 0xff), 'zzzzy')
	checkDecode(Buffer.of(0xff, 0xff, 0xff, 0xff), 'zzzzzzr')
	checkDecode(Buffer.of(0xff, 0xff, 0xff, 0xff, 0xff), 'zzzzzzzz')
	checkDecode(Buffer.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff), 'zzzzzzzzzw')

	checkDecode(Buffer.from('', 'hex'), '')
	checkDecode(Buffer.from('09', 'hex'), '14')
	checkDecode(Buffer.from('457a', 'hex'), '8nx0')
	checkDecode(Buffer.from('ffd12c', 'hex'), 'zz8jr')
	checkDecode(Buffer.from('7882692b', 'hex'), 'f216jar')
	checkDecode(Buffer.from('380ddb9359', 'hex'), '706xq4ts')
	checkDecode(Buffer.from('ab2b6e3c606e', 'hex'), 'ncnpwf30dr')
	checkDecode(Buffer.from('fd0222d928a13f', 'hex'), 'zm125p98m4zg')
	checkDecode(Buffer.from('8c1f3b18b1897048', 'hex'), 'hgfkp65hh5r4g')
	checkDecode(Buffer.from('8ff8c893058278ada1', 'hex'), 'hzwch4r5g9wav88')
	checkDecode(Buffer.from('ac4bd194a0648a1a6d29', 'hex'), 'nh5x3550cj51mv99')
	checkDecode(Buffer.from('eaeab4d449f18e529dd808', 'hex'), 'xbnb9n29y67557er10')
	checkDecode(Buffer.from('c3794135fc996302cf8378d7', 'hex'), 'rdwm2dfwk5hg5kw3f3bg')
	checkDecode(Buffer.from('b6443681a2cd80ad76e9ab0a85', 'hex'), 'ps23d0d2sp0atxq9nc58a')
	checkDecode(Buffer.from('44f3e0562571166d2d0e7706c6a1', 'hex'), '8ksy0nh5e4b6tb8eew3cd88')
	checkDecode(Buffer.from('79db919d01c5a8f4d91a91eca08476', 'hex'), 'f7ds3781rpmf9p8tj7pa113p')
	checkDecode(Buffer.from('926a918cda38b170a979c90bc9a4afea', 'hex'), 'j9n9336t72rq1abss45wk95fx8')
	checkDecode(Buffer.from('3f5cef1e80fb78b09b23bc49583cd1fc35', 'hex'), '7xeey7m0zdwb16s3qh4ngf6hzgtg')
	checkDecode(Buffer.from('67036472f398499af1dece581e14dc9124b8', 'hex'), 'cw1p8wqkk14snweyssc1w56wj4jbg')
	checkDecode(Buffer.from('8f76a13e1879fdf1501080d4d0f107abda60cd', 'hex'), 'hxva2fgrf7yz2m0gg3ad1w87nfd61k8')
	checkDecode(Buffer.from('c17612bc73c7be6821cfe43bc3693b9a2d090ca9', 'hex'), 'r5v15f3kryz6g8efwgxw6t9vk8pgj359')
	checkDecode(Buffer.from('ff5268cfcc8ccf5704fcaf6790e522ae7506f4ca68', 'hex'), 'zx96hkychk7ne17wnxks1s92nstgdx6ad0')
	checkDecode(Buffer.from('09868d1ada20605093f175e2f14155bc9adbc98d7e03', 'hex'), '1638t6pt41g514zheqhf2ganqjddqjcdfr1g')
	checkDecode(Buffer.from('84c7826c478a00d1505466d3eb0b943465e56c858e93ae', 'hex'), 'gk3r4v27h80d2m2mcv9yp2wm6hjyav45ht9tw')
	checkDecode(Buffer.from('ffb458898b23e6f5e855c4542a313d97b5bdca2d8c2b8a13', 'hex'), 'zyt5h2cb4fkfbt2nrha2mc9xjytvvjhdhgnrm4r')
	checkDecode(Buffer.from('e1e3b64ba128f8a5f5307b1e11761a3821a977cd72787fc4c7', 'hex'), 'w7hvcjx153wabx9gfcf12xgt70gtjxyde9w7zh67')
	checkDecode(Buffer.from('28288774b1161d5d95779028b07babb0472220f2db429d22343b', 'hex'), '50m8ex5h2renv5bqj0mb0yxbp13j487jvd19t8hm7c')
	checkDecode(Buffer.from('8c9d00d0034fb946c28ddd0b74c0edc13a6f0198f59df30a593023', 'hex'), 'hjeg1m039ywmdgmdvm5q9g7dr4x6y0crypez62js60hg')
	checkDecode(Buffer.from('93dc3295e05b2c814fbf8bf8ad243458d443401495f395636119de44', 'hex'), 'jfe355f0bcp82kxzhfwat91mb3a46g0mjqssarv137f48')
	checkDecode(Buffer.from('d6aa1f6ec640273d6352888f6ce2b4413959af0d12190dba46484a0258', 'hex'), 'ttn1yvp680kktrtjh27psrnm84wnkbrd28cgvej691504p0')
	checkDecode(Buffer.from('0282c8f87ea8a04d78d0799c19de1fd5ea9a19a14a12c6d11823b4c1c382', 'hex'), '0a1chy3yn2g4ty6gf6e1kqgztqn9m6d1989cdm8r4etc3gw2')
	checkDecode(Buffer.from('de4bb126cd8eac240f5d175a6a65ae85a05d90ff399dff6896c965ba8ff1f0', 'hex'), 'vs5v29pdhtp283tx2xd6msdegpg5v47z76ezyt4ps5jvn3zhy0')
	checkDecode(Buffer.from('bcd0278408825bd002658ec6613ed5a0e05aa4865e2b79eaa95da1fa60fc2846', 'hex'), 'qk82f108g9dx00k5hv362fpnm3g5n946brnqktn9bpgzmr7w5130')
	checkDecode(Buffer.from('71d4ea0d432b552f36cf8778013e4553bf8949ab886c1b8a36a450b875f5d994af', 'hex'), 'e7aem3a35dajydpfgxw02fj5aezrjjdbh1p1q2hpmh8bgxfnv6aay')
	checkDecode(Buffer.from('cc641179484953bbbc545013e0d694a1b511a87feb68f9b92523bfba356d8e459a88', 'hex'), 'shj12ya8959vqf2ma09y1nmmm6th3a3zxdmfke954ezvmdbdhs2sn20')
	checkDecode(Buffer.from('e01a9d59b79b2b304c68f2c4b0956fb04cdf68c1fe6070208be98b5ad7a4aef22e7618', 'hex'), 'w0d9tpdqkcnk0k38yb2b15bfp16dyt61zsg7084bx65nnnx4nvs2wxgr')
	checkDecode(Buffer.from('3bec0ecfcde52ba6feb6a4044990a19cdd5c21b0e42ac59b9c92ca815d346cdb8ac1ae87', 'hex'), '7fp0xkydwmntdznpmg24k451kkenr8dgwgncb6wwjb582q9mdkdrngdegw')
	checkDecode(Buffer.from('b64a232180da94f87fbfed43392917ce687b179b0d63c8e99588d6b500e76ef94d848d4baa', 'hex'), 'ps5268c0vaafgzxzxn1kja8qssm7p5wv1nhwhtcnh3bba077dvwmv14d9en0')
	checkDecode(Buffer.from('f5b89d90bef6205c9c7f2d727aaf3f35e221badd735bd23419e5417a8feefa7fb1a78375018a', 'hex'), 'ypw9v45yyrg5s73z5ns7nbsz6qh23epxeddx4d0swn0qn3zez9zv39w3em0rm')
	checkDecode(Buffer.from('3388294adeab96671826df86cd37f575fe083d105ceed97471effda666a66a461d38932543a372', 'hex'), '6e42jjpyneb6e616vy3ctdzneqz0gf8gbkqdjx3hxzytcsn6d931te4k4n1t6wg')
	checkDecode(Buffer.from('fa27eb404608afa4ec1f7ab76dd0299089a7afcd28f400dbf3bc0736170ce963d093e247e29dc5ff', 'hex'), 'z8kypg2612qt9v0zfavpvm19j24tfbyd53t01pzkqg3kc5rcx5hx14z28zh9vhfz')
	checkDecode(Buffer.from('aa51d9e649926abbbbe1fc7146c63c583b49953afc9f3fae8844e0689a13ca945b6c2ec23fec83959b', 'hex'), 'n98xksj9j9nbqez1zhrmdhhwb0xmk59tzjfkzbm88kg6h6gksaa5pv1er8zys0wnkc')
	checkDecode(Buffer.from('2469500c5e52829e8cc02eb11404cc5492e78808a309eed96066f90a116d37336cc8c5d3a4c4a52fe15b', 'hex'), '4hmn032yaa19x3605trh816caj9ef208mc4yxpb0cvwgm4bd6wspsj65tejc999fw5dg')
	checkDecode(Buffer.from('4c244de172eb1457e40556858755d25e6c7051b5c0f1f8881fb73cf6537c2fd61682bb1dcbe23d1dcde263', 'hex'), '9gj4vrbjxca5fs05at2renejbsp70mdnr3rzh20zpwyfcmvw5zb1d0nv3q5y4f8xsqh66')
	checkDecode(Buffer.from('24fb814c81a9300d76a0e94797d519d9640245b53c9b95206b77b1aa78339be984483a6e46ffd175bfac341e', 'hex'), '4kxr2k41n4r0txn0x53sfn8sv5j04hdn7jdsa83beyrtmy1kkfmr8j1tds3fzmbnqyp387g')
	checkDecode(Buffer.from('1b5abfe7432b78ffb71efa06c25cfd1c0dcb2e3cabf0e69f539ace88955dbbb065b66ad0476090fd25461c0204', 'hex'), '3ddbzst35dwfzdryz83c4q7x3g6wpbhwnfred7tkkb78h5axqer6bdkat13p147x4n31r0g4')
	checkDecode(Buffer.from('4d5d74f727c8c0ccda64b2d3c32cf0e0bade37066e798abf0cf04f310a3dd9b69817720ba7ac81ff604cde40ea18', 'hex'), '9neq9xs7s30cspk4pb9w6b7gw2xdwdr6dswrnfrcy17k22hxv6v9g5vj1ekts0fzc16dwg7a30')
	checkDecode(Buffer.from('57d71819228a1784a21f2e127b752a5f895c19f74d2c42e808fb04f0945f2ee803f2b7dbd778d491d2f33a848157f6', 'hex'), 'azbhg692h8br98gz5r97px9aby4nr6fq9mp45t08zc2f152z5vm07wnqvfbqhn4htbskn141azv0')
	checkDecode(Buffer.from('4c54170eef53c21463e9d6aa688d7031d0e60b1396349cf0445ec31fef011d639c5e92eb8173c731f6feb4672ce40108', 'hex'), '9ha1e3qfaf118rz9ttn6h3bg678ec2rkjrt9sw24bv1hzvr13nhsrqmjxe0q7hshyvzb8sscwg0gg')
	checkDecode(Buffer.from('d67bf620ce1db64fc430e981df60d0b43d32772b3db0382642dfddaf2f9407b551bf5bd31f5d9dfcd2097e7e04d9317197', 'hex'), 'tsxzc86e3pv4zh1gx60xyr6gpgyk4xsb7pr3g9j2vzetybwm0ytn3ftvtcfnv7fwt84qwzg4v4rq35r')
	checkDecode(Buffer.from('0296f33523146d27bd5219e7373350881e8fb72a674df3b43e0e4c35a030c9f53a6101e0e47d02144d9f1a89362a7558815e', 'hex'), '0abf6d932hpjffaj37kkectgh0f8zdsacx6z7d1y1s63b81gs7tkmr81w3j7t0gm9pfhn29p59tnh0ay')
	checkDecode(Buffer.from('810ec5123f8edd85c2d8fd2578cf4e3ec0af81e1b1fd4e921c39b05c8ad22f22a78e3c4663714de2671c64a6cb776bdd703b1d', 'hex'), 'g47ca4hzhverbgprzmjqhkte7v0az0f1p7ymx4gw76r5s2pj5whaf3hw8shq2kf2cwe699pbexnxtw1v3m')
	checkDecode(Buffer.from('d2958beb3be6ed4bfff0b9e52c697b4b8f532868054cefef922df564151211a46a4b020fe3956c9e5434be2856f34f3360ecdb1c', 'hex'), 'taarqtsvwvpmqzzgq7jjrtbv9e7n6a380n6ezvwj5qtp858j26j6mjr21zhsav4yagtbwa2pyd7k6r7cvce0')
	checkDecode(Buffer.from('e86354aabbdf5dbdefb842d372f09be9bea31c21e33aac3726565c94ff5588de6a7e113f03640b3535ac882e90dd9a40e4f06b32ac', 'hex'), 'x1hn9anvvxevvvxr8b9q5w4vx6za6711wcxards6ase99ztnh3f6mzgh7w1p82sn6pp8gbmgvpd41s7gdcsar')
	checkDecode(Buffer.from('b78ed54526ac606addbb742baea742e50964d61322452dec96eac6b1b3441801cfa878d24eb6b91ac87f42f4becb76c182a8602e2788', 'hex'), 'py7dah96nhg6nqdvegntx9t2wm4p9ngk492jvv4pxb3b3ct4300wza3rt97bde8ts1zm5x5ysdvc30n8c0q2f20')
	checkDecode(Buffer.from('fa33da9a9847f89f6ac79156d44b4972677e9f9f4721d8136d0e71a41c8e02de92f5992cc3438b18d833cdaff3d17e1279b5bae843fa59', 'hex'), 'z8sxn6mr8zw9ytp7j5bd8jt9e9kqx7wz8wgxg4vd1srt874e0bf95xcs5k1m72rrv0swvbzkt5z14ydnqbm47yjs')
	checkDecode(Buffer.from('e5535c2a75c7c80acd78437bb3fd021b41f73ad42223978d1b9d37c2b9f92ba20c8695070df7179d4e2140c09cfee4c77b7574194f5389fd', 'hex'), 'wn9nraknrz40nkbr8dxv7z823d0zeepm48hsf38vkmvw5efs5eh0s1mn0w6ze5wx9rgm1g4wzvjceyvnegcmymw9zm')
	checkDecode(Buffer.from('7f720dd1c5f0dd5e0c0c137fec484aeb6c108daeeab34d0144a20055dca9f7dba446b930d63e12a6bd963dcea3dd7c034d2b13b55d01cd23ca', 'hex'), 'fxs0vme5y3enw30c2dzyrj2axdp113dexasmt0a4m805bq59yzdt8hns63b3w4n6qpb3vkn3vny06k9b2etnt0ed4f50')
	checkDecode(Buffer.from('7bcdc357354e147c1c0f796dee59d01b53d47c3c7432d93946bc4896afab78759e700c8d95453de59e24ecfc4d98659bab3f08d0d60e475edcc6', 'hex'), 'ff6w6nsn9ra7r70ff5pywpeg3d9x8z1wegsdjea6qh49dbxbf1tsww0chpamaff5krjesz2dk1jsqasz138dc3j7bvecc')
	checkDecode(Buffer.from('4d2e932e17a7f526ef3c16fc025d0ae5adefd5c25ac8b065655f54679525d83fac9b2cd17d7ab2f96f7a074e40aed9e12e74565264f4afc332c544', 'hex'), '9mq96bgqmztjdvsw2vy04q8awppyzne2bb4b0sb5bxa6f595v0zts6sct5yqncqsdxx0ekj0nvcy2bkmas969x5frcscah0')
	checkDecode(Buffer.from('7c0c24afd702e10843e41dd14e2a3792c0f578d87cbce3d84833b7d7a5969a9d6ea2a27e7e03e95ee9a9d32e68d8ebe42a1e9a22fb1a6be47fed7d53', 'hex'), 'fg629byq0bggggz43q8mwahqjb0fay6rfjye7p286evxf9cpkaepx8n2fsz07tayx6mx6bk8v3ny8agyk8hfp6kbwhzytzak')
	checkDecode(Buffer.from('1be6d9520859b3c1d627137d0b0b0a07186e1ee283c5ffc86b01a97c0036b6f623ac041c3cc133bf064f558ac376a8fb5b332c672254170796b494584c', 'hex'), '3fkdjmg8b6sw3nh72dygp2ra0wc6w7q2gf2zzj3b06mqr01ppvv27b043gyc2cxz0s7nb2p3etmfppsk5hkj4n0q0ybb952r9g')
	checkDecode(Buffer.from('235771e2526c910999e351b11501a41126fefe87bc2169ac8f92b46d63a19f49e314c820e5dbbac3a5fda9d2276d3bcc4edf5b06956372a2cc4f9876b54c', 'hex'), '4dbq3rjjdj8gk6f3a6rha0d424kfxzm7qggpkb4fjat6trx1kx4y656843jxqep3mqytkmh7dmxwrkpzbc39arvjmb64z63ppn60')
	checkDecode(Buffer.from('f18dd41cc49c34b63fac899e8684962ce404e64e688178f82998ff39e19ba3a8dba6f1718e5260f3a3daad39efe245e03ed5ba291d50c02f5b3d722d0113fb', 'hex'), 'y66x8764kgtbcfxch6f8d14p5kj09sjed20qhy19k3zkkrcvmemdq9qhe6754r7kmfdateffw92y0fpnq8mhtm605xdktwhd049zp')
	checkDecode(Buffer.from('87bb0ac6ffaca477d80b9125e7a8b036c32cffce716ce1032578dee019f47d8f7252ccfed5d52713ff99729719837cd5403cac5bc941961494aca40a66314058', 'hex'), 'gyxgnhqznjj7fp0bj4jyfa5g6v1jszyee5pe20s5f3fe06fmfp7q4mpczvaxa9rkzycq55rsgdydag1wnhdwjgcp2jaas90acrrm0p0')
	checkDecode(Buffer.from('ff455404941409fc363abf9ae8e89d713b7f5a13daba4033067c829bac78a754bd199a572c0cb9c6ea5af2d6b6aeaaa22d9320458e46c527b4b7629b38a6be68ba', 'hex'), 'zx2n814m2g4zrdhtqydeht4xe4xqypgkvax40cr6fj19qb3rmxabt6ctawp0see6x9df5nnpntna4bck412rwhp54ytbermv72kbwt5t')
	checkDecode(Buffer.from('b231c654fa05e0f29d607b8f11020beda8d52e0504d0e2c437b92d4bb1152edb26851c7865c92961fa00565202a77e1f369793978e9bb36c8fb49675d0bfea4d677f', 'hex'), 'p8rwcn7t0qgf57b0fe7h20gbxpmdabg50k8e5h1qq4pmqc8n5vdjd18wf1jwjab1z805cmg2mxz1ydmqjebrx6xkdj7v95knt2zymkb7fw')
	checkDecode(Buffer.from('8b9892f73052a6535e468efb9c5e1cd3a5e4548634ea1a1fd7f225709e75680a4f50b7dd31149faf9d73ea0909602fd6a5d97af139a4c5033bf0744747d741c849a3f0', 'hex'), 'hec95xsgaak56qj6hvxsrqgwtejy8n466kn1m7yqy8jq17knd054ym5qvmrh97xfknsym289c0qxd9esfbrkk9650cxz0x278zbm3j29mfr0')
	checkDecode(Buffer.from('1f00bf79706675b2e5ef0c156150f527492d0dc884a9ba416e679ee6ede154baf782f16a8c62898ec831f09dfc4a24e05e0836c92a7bfbe831866afa02c9335e08833f2a', 'hex'), '3w0byybgcstv5sff1gap2m7n4x4jt3e8gjmvmgbecyfedvf1ajxff0qhda6652ces0rz17fw98je0qg86v4jmyzvx0rrctqt0b4k6qg8gczjm')
	checkDecode(Buffer.from('411cb150bf57dd3d15c0d7c7fdfb4ae965b0aecf79aa568dea4e0a7cf3ed6814902acdf0e09c87b45b2bca82c03a3ec1a5b7e1d836a30c39d270914702ff9eb6377cf82c76', 'hex'), '84eb2m5zazekt5e0tz3zvytax5jv1bpff6n5d3fa9r57swzdd0a90apdy3g9s1xmbcnwn0p078zc39dqw7c3d8rc779714a70bzsxdhqfkw2rxg')
	checkDecode(Buffer.from('91e80940cda29c18c583018d3f5559f3974182c97f5928d3e49a0c1c52b10178a3990a7fc9ea64bde11151d21a3050db93ce27f921d5add1174698bfc343317674512ffc85c3', 'hex'), 'j7m0jg6dmae1hhc3066kynasyebm30p9fxcjhmz4k861rmnh05wa768afz4yms5xw48n3mgt618dq4ye4zwj3nddt4bmd65zrd1k2xkma4qzs1e3')
	checkDecode(Buffer.from('f827e9fe125247c42c6702a215d26572f89889784db83d0a3abea8d76bbb2bea7dd9329864fad29fdc0da494fca227c75682f3463d76523a3e46df81e6ab9322581f753248004e', 'hex'), 'z0kykzgja93w8b370ah1bmk5ebw9h2br9pw3t2htqtmdetxv5fn7vp9jk1jfnmmzvg6t957wm8kwenm2yd33txjj78z4dqw1wtns68jr3xtk4j009r')
	checkDecode(Buffer.from('227c64a0cfffa2c3c5be5bf65a3bafba3dac884b3d619554ac28992248a0b0caaa3549c7eb0fd6844208c67d8dc6e6dfbfae92bd60612910d26fd0cfe923628829bd849ae373ee8f', 'hex'), '49y6986fzyhc7hdybfv5mexfq8yts22b7ngsan5c52cj4j50p35amda9rzngznm4884cczcdrvkdzfxejayp0r992396zm6fx4hp5219qp29nrvkxt7g')
	checkDecode(Buffer.from('5f1c422b7d094d74f35e9d1a4848399965ab5a1ec996b57b7bf3d4d440e468b638d5abf23df1020e8170f0dd1d243cd83636700ba41d8253892832ebb42a32b57aa2461798c6a28401', 'hex'), 'bwe44avx156q9wtykmd4gj1sk5jtppgys6bbayvvyfad8g74d2v3hndby8yz20geg5rf1q8x4gydgdhpe05t87c2ae4jgcqbpgn35dbtm931f666ma202')
	checkDecode(Buffer.from('f6295b77efb8f4abab291f5e795985957f01424d30c0eb2e15739969142b52805eb2f9a273090323b8e8277daec66f00d9647642bfd0d1168cd214309a49b7787f454797e6d1e3c836ff', 'hex'), 'yrmnpxzfq3taqas93xf7jpc5jnzg2gjd630epbgneecpj51baa05xcqsm9sgj0s3q3m2ezdersqg1pb4es1bzm6h2t6d451gk94vey3z8n3sfsphwf43dzr')
	checkDecode(Buffer.from('26369b1885df32ef3014db04e663c339558811d8a65d690d053ccacb0f5cfa2576a45d403c885509c6b59f8855fb99b37284268f14f28e5c75c99bf601040fb8be12a07e34e17bbe4827f5', 'hex'), '4rv9p645vwseyc0mvc2ecry375arg4ermsepj3857k5cp3twz8jqd92x80y8gn89rttsz22nzecv6wm44t7h9wmebhtwk6zp0420ze5y2ag7wd71fez4g9zn')
	checkDecode(Buffer.from('b641fc01489cc725a8cbbab6e6a3caa669504215c89e0e862b39bd7727d2ce1572cb03fe4b82f50f9bb751dc83a89665d7f3848b5087fa06fea5ad75d41b65ca2abf72abb91ad5391cc198cf', 'hex'), 'ps0zr0a8kk3jba6bqaved8yamsmn0ggns2f0x1hb76yqe9yjsraq5jr3zs5r5x8fkevn3q43n2b6bnzkgj5n11zt0vzabbbntgdpbjhaqxsaqe8ttmwhsgcrsw')
	checkDecode(Buffer.from('4bde9156ea3c955b7a880e25f151a15234b80557fff239057c1c28bb6ba2ae920f65576ac82654a347d9ea76c243da1461ade7844f067f7746d9189ada7c631bc6051c0ab7187671323484c008', 'hex'), '9ff92nqa7janpym81rjz2md1a8tbg1aqzzs3j1bw3gmbptx2nt90ysaqdb42cn538zcymxp28fd18rddwy24y1kzex3dj64tv9y666y60me0ndrresrk4d44r040')
	checkDecode(Buffer.from('72e5e0ba4b09fa850361dcebe108f47824a37704344451906ae100deb977d177ff2444325537f2b7fdb36bca4129a735cf180bde3fc2809ea5d2ccaac74d6fc8010d677c9b48c577ad6580a10655', 'hex'), 'ebjy1ejb17x8a0v1vkny227mf0ja6xr46h25343aw40dxebqt5vzy92469akfwnqzpspqjj156kkbkrr1ff3zgm0ktjx5k5arx6pzj011nkqs6t8rnvttsc0m435a')
	checkDecode(Buffer.from('a41f8dc24e8d4f23861a32d3e994e0e3e9f936b13ffeeec44f203bb183b89c2db09ea02a9c76f15ee47c7b67cae87745a56585e0f7cb256072541aca37faa0588b384e823af82fb6758cfdb0319c62', 'hex'), 'mgfrvgjehn7j71gt6b9yk570wfmzjdnh7zzexh2f40xv30xrkgpv17n05ae7dwaywhy7psyax1vmb9b5gqgffjs5c1s586pa6zxa0p4b71784eqr5yv7b37xp0rsrrg')
})

test('decode mistyped input', (t) => {
	t.deepEqual(
		decode('aoblcOdLeifIABCDEFGHJKMNPQRSTVWXYZ'),
		decode('a0b1c0d1e1f1abcdefghjkmnpqrstvwxyz')
	)
})

test('check symbols, hyphens and accidental padding is removed', (t) => {
	t.deepEqual(
		decode('abcdefgh-1234-5678*~$=uU===='),
		decode('abcdefgh12345678'),
	)
})
test('invalid input', (t) => {
	// The default decode maps invalid characters to 0 but does not throw
	t.deepEqual(
		decode('invalid!"#€'),
		decode('1nva11d0000')
	)

	let verifyingDecode = decode.configure({
		verifyInput: true
	})

	t.throws(
		() => {
			return verifyingDecode('invalid!"#€')
		},
		{ message: 'Invalid input: "invalid!"#€"' }
	)
})
