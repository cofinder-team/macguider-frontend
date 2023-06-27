const desks = [
  {
    id: '1',
    author: 'SimpleMotive',
    name: '고급스러운 인테리어 감성과 어우러진 데스크',
    href: '/desk/1',
    imageSrc: 'https://static.waveon.io/img/apps/18146/desk1.png',
    imageAlt: 'main-image',
    sections: [
      {
        id: 1,
        name: '고급스러운 인테리어 감성과 어우러진 데스크',
        images: [
          {
            id: 1,
            src: 'https://static.waveon.io/img/apps/18146/desk1.png',
            alt: 'desk-image-1',
            cover: true,
          },
          {
            id: 2,
            src: 'https://static.waveon.io/img/apps/18146/desk2.png',
            alt: 'desk-image-2',
            cover: true,
          },
          {
            id: 3,
            src: 'https://m.media-amazon.com/images/I/81PqtjKHVlL.jpg',
            alt: 'product-image-1',
            cover: false,
          },
          {
            id: 4,
            src: 'https://resource.logitech.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1',
            alt: 'product-image-2',
            cover: false,
          },
          {
            id: 5,
            src: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MK2D3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1626390718000',
            alt: 'product-image-3',
            cover: false,
          },
          {
            id: 6,
            src: 'https://caldigitkr.cafe24.com/web/product/medium/202306/0e3deb5023001d955674275d4b37062e.jpg',
            alt: 'product-image-4',
            cover: false,
            link: 'http://www.thway.co.kr/bbs/board.php?bo_table=product&wr_id=125',
          },
          {
            id: 7,
            src: 'https://cdn.shopify.com/s/files/1/0281/7930/0487/products/DeltahubDeskpadSmall_1024x1024_crop_center.jpg?v=1681816344',
            alt: 'product-image-5',
            cover: false,
            link: 'http://www.thway.co.kr/bbs/board.php?bo_table=product&wr_id=125',
          },
          {
            id: 8,
            src: 'https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dw4c43314c/images/hi-res/a/139612314_WIZ017-BLK_3in1WirelessChargingDock_Hero_WEB.png?sw=700&sh=700&sm=fit',
            alt: 'product-image-6',
            cover: false,
            link: 'http://www.thway.co.kr/bbs/board.php?bo_table=product&wr_id=125',
          },
          {
            id: 9,
            src: 'https://www.caldigit.com/wp-content/uploads/2021/11/TS4_Horizontal-View_Front_White-BG.jpg',
            alt: 'product-image-7',
            cover: false,
            link: 'http://www.thway.co.kr/bbs/board.php?bo_table=product&wr_id=125',
          },
        ],
        productInfo: [
          {
            id: 1,
            title: 'AZIO Cascade Slim',
            desc: '',
            category: '키보드',
            src: 'https://m.media-amazon.com/images/I/81PqtjKHVlL.jpg',
            alt: 'AZIO Cascade Slim',
            link: 'https://search.shopping.naver.com/search/all?query=AZIO+Cascade+Slim&bt=-1&frm=NVSCPRO',
          },
          {
            id: 2,
            title: '로지텍 MX MASTER 3S',
            desc: '',
            category: '마우스',
            src: 'https://resource.logitech.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1',
            alt: '로지텍 MX MASTER 3S',
            link: 'https://search.shopping.naver.com/search/all?query=%EB%A1%9C%EC%A7%80%ED%85%8D%20MX%20MASTER%203S&prevQuery=AZIO%20Cascade%20Slim',
          },
          {
            id: 3,
            title: 'Magic Trackpad - 화이트 Multi-Touch 표면',
            desc: '',
            category: '트랙패드',
            src: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MK2D3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1626390718000',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            link: 'https://search.shopping.naver.com/search/all?query=Magic%20Trackpad&prevQuery=%EB%A1%9C%EC%A7%80%ED%85%8D%20MX%20MASTER%203S',
          },
          {
            id: 4,
            title: 'MAYWOOD 풀사이즈 데스크선반',
            desc: '',
            category: '선반',
            src: 'https://caldigitkr.cafe24.com/web/product/medium/202306/0e3deb5023001d955674275d4b37062e.jpg',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            link: 'https://caldigitkr.cafe24.com/shop3/product/detail.html?product_no=35&cate_no=48&display_group=1',
          },
          {
            id: 5,
            title: 'Minimalistic Desk Mat',
            desc: '',
            category: '데스크 매트',
            src: 'https://cdn.shopify.com/s/files/1/0281/7930/0487/products/DeltahubDeskpadSmall_1024x1024_crop_center.jpg?v=1681816344',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            link: 'https://us.deltahub.io/products/minimalistic-desk-pad',
          },
          {
            id: 6,
            title: 'Belkin iPhone용 3-in-1 MagSafe 무선 충전기',
            desc: '',
            category: '충전기',
            src: 'https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dw4c43314c/images/hi-res/a/139612314_WIZ017-BLK_3in1WirelessChargingDock_Hero_WEB.png?sw=700&sh=700&sm=fit',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            link: 'https://search.shopping.naver.com/search/all?query=%EB%B2%A8%ED%82%A8%203%20In%201&cat_id=&frm=NVSHATC',
          },
          {
            id: 7,
            title: 'CalDigit | TS4',
            desc: '썬더볼트 4독 중에 단연 최고',
            category: '독',
            src: 'https://m.caldigit.co.kr/web/product/big/202204/328f0a870b89aaa891d3eb1e2f8ba09c.jpg',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            link: 'https://caldigit.co.kr/product/ts4/9/',
          },
        ],
        desc: '여기는 보시다시피 제 메인 셋업입니다. 장비를 계속해서 이것저것 많이 구매하지만 결국 토너먼트 식으로 정말 필수 제품들만 책상에 남아있고 나머지는 창고행이 되어 버리네요.. 장비를 구매하는건 맥시멀리스트처럼 구매하지만 책상 위 만큼은 미니멀리스트 느낌을 잃어버리고 싶지 않아서 너무 많은 제품들은 두지 않으려고 합니다.',
      },
      {
        id: 2,
        name: '고급스러운 인테리어 감성과 어우러진 데스크',
        images: [
          {
            id: 1,
            src: 'https://static.waveon.io/img/apps/18146/스크린샷_2023-05-25_오후_10.58.11.png',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            cover: true,
          },
          {
            id: 2,
            src: 'https://cdn.011st.com/11dims/resize/1000x1000/quality/75/11src/asin/B07NP3SCH3/B.jpg?1686895993672',
            alt: 'AZIO Cascade Slim',
            cover: false,
          },
          {
            id: 3,
            src: 'https://m.media-amazon.com/images/I/51tkoVc0tyL.jpg',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            cover: false,
          },
        ],
        productInfo: [
          {
            id: 1,
            title: 'AZIO 레트로 컴팩트 키보드 암레스트 포함 엘우드',
            desc: '빈티지 스타일의 프리미엄 소재로 만든 기계식 키보드',
            category: '키보드',
            src: 'https://cdn.011st.com/11dims/resize/1000x1000/quality/75/11src/asin/B07NP3SCH3/B.jpg?1686895993672',
            alt: 'AZIO Cascade Slim',
            link: 'https://search.shopping.naver.com/search/all?query=AZIO%20%EB%A0%88%ED%8A%B8%EB%A1%9C%20%EC%BB%B4%ED%8C%A9%ED%8A%B8%20%ED%82%A4%EB%B3%B4%EB%93%9C%20%EC%95%94%EB%A0%88%EC%8A%A4%ED%8A%B8%20%ED%8F%AC%ED%95%A8%20%EC%97%98%EC%9A%B0%EB%93%9C&prevQuery=CalDigit%20Ts4',
          },
          {
            id: 2,
            title: 'SAMDI Wooden Computer Monitor Stand',
            desc: '',
            category: '받침대',
            src: 'https://m.media-amazon.com/images/I/51tkoVc0tyL.jpg',
            alt: 'SAMDI Wooden Computer Monitor Stand',
            link: 'https://www.samdi.hk/samdi-simple-wooden-pc-accessories/samdi-wooden-monitor-stand-riser-stand-shelf-stand-for-all-imac-and-other-computers-lcd-monitors.html',
          },
        ],
        desc: '여기는 제 아내가 사용하는 사이드 테이블입니다. 아내 셋업은 너무 초라한게 아닌가 생각하실수도 있지만,,,ㅎㅎ 여기는 어디까지나 저의 방(저만의 아지트)이며 아내가 함께 빌려 쓰고 있기 때문에 아내의 장비들은 왠만하면 놓지 못하게 하고 있습니다. 대신 제가 사무실에 있을때는 아내는 썬더볼트 독으로 맥북을 연결해 제 메인 셋업을 이용합니다. 그럴때마다 제 키보드와 데스크매트 위치 바뀌어 있는거보면 잔소리를 하게 되죠 하...',
      },
    ],
  },
  {
    id: '2',
    author: '다이니마',
    name: '헤드폰&키보드 구매 기념 데스크 셋업',
    href: '/desk/2',
    imageSrc: 'https://static.waveon.io/img/apps/18146/desk3.png',
    imageAlt: '데스크',
    sections: [
      {
        id: 3,
        name: '헤드폰&키보드 구매 기념 데스크 셋업',
        images: [
          {
            id: 1,
            src: 'https://static.waveon.io/img/apps/18146/desk3.png',
            alt: '데스크',
            cover: true,
          },
          {
            id: 2,
            src: 'https://cdn.imweb.me/thumbnail/20230508/9a6ba0194d9f3.jpg',
            alt: 'Varo V87 Pro',
            cover: false,
          },
          {
            id: 3,
            src: 'https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc45/product_silo_images/QC45_PDP_Ecom-Gallery-B03.jpg/jcr:content/renditions/cq5dam.web.600.600.jpeg',
            alt: 'Bose QuietComfort® 45 Headphones',
            cover: false,
          },
          {
            id: 4,
            src: 'https://www.lge.co.kr/kr/images/monitors/md08044963/gallery/medium01.jpg',
            alt: 'LG 울트라 HD 모니터',
            cover: false,
          },
          {
            id: 5,
            src: 'https://prismlight.co.kr/web/product/big/202111/9fb2b46f6d90db3fa4edcae5a0f3bffa.jpg',
            alt: '프리즘 LED 대형 스탠드 브로드윙 K',
            cover: false,
          },
          {
            id: 6,
            src: 'https://resource.logitech.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1',
            alt: '로지텍 MX MASTER 3S',
            cover: false,
          },
          {
            id: 7,
            src: 'https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dw4c43314c/images/hi-res/a/139612314_WIZ017-BLK_3in1WirelessChargingDock_Hero_WEB.png?sw=700&sh=700&sm=fit',
            alt: 'Belkin iPhone용 3-in-1 MagSafe 무선 충전기',
            cover: false,
          },
        ],
        productInfo: [
          {
            id: 1,
            title: 'Varo V87 Pro',
            desc: 'V87 Pro',
            category: '키보드',
            src: 'https://cdn.imweb.me/thumbnail/20230508/9a6ba0194d9f3.jpg',
            alt: 'Varo V87 Pro',
            link: 'https://varoworks.com/shop_view/?idx=20',
          },
          {
            id: 2,
            title: 'Bose QuietComfort® 45 Headphones',
            desc: '고요함의 아이콘. 편안함. 그리고 사운드.',
            category: '헤드폰',
            src: 'https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc45/product_silo_images/QC45_PDP_Ecom-Gallery-B03.jpg/jcr:content/renditions/cq5dam.web.600.600.jpeg',
            alt: 'Bose QuietComfort® 45 Headphones',
            link: 'https://bose.co.kr/shop/goods/goods_view.php?&goodsno=633',
          },
          {
            id: 3,
            title: 'LG 울트라 HD 모니터',
            desc: '화질로 감동 받아보신 적 있나요?',
            category: '모니터',
            src: 'https://www.lge.co.kr/kr/images/monitors/md08044963/gallery/medium01.jpg',
            alt: 'LG 울트라 HD 모니터',
            link: 'https://www.lge.co.kr/monitors/32un880',
          },
          {
            id: 4,
            title: '프리즘 LED 대형 스탠드 브로드윙 K',
            desc: '집중이 필요한 공간에 어울리는 최적의 스탠드',
            category: '스탠드',
            src: 'https://prismlight.co.kr/web/product/big/202111/9fb2b46f6d90db3fa4edcae5a0f3bffa.jpg',
            alt: '프리즘 LED 대형 스탠드 브로드윙 K',
            link: 'https://prismlight.co.kr/product/detail.html?product_no=545&cate_no=72&display_group=1',
          },
          {
            id: 5,
            title: '로지텍 MX MASTER 3S',
            desc: '아이코닉 마우스. 새롭게 마스터.',
            category: '마우스',
            src: 'https://resource.logitech.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1',
            alt: '로지텍 MX MASTER 3S',
            link: 'https://www.logitech.com/ko-kr/products/mice/mx-master-3s.910-006564.html',
          },
          {
            id: 6,
            title: 'Belkin iPhone용 3-in-1 MagSafe 무선 충전기',
            desc: 'MagSafe 기술이 적용된 3-in-1 무선 충전기',
            category: '충전기',
            src: 'https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dw4c43314c/images/hi-res/a/139612314_WIZ017-BLK_3in1WirelessChargingDock_Hero_WEB.png?sw=700&sh=700&sm=fit',
            alt: 'Belkin iPhone용 3-in-1 MagSafe 무선 충전기',
            link: 'https://www.belkin.com/kr/magsafe-%EA%B8%B0%EC%88%A0%EC%9D%B4-%EC%A0%81%EC%9A%A9%EB%90%9C-3-in-1-%EB%AC%B4%EC%84%A0-%EC%B6%A9%EC%A0%84%EA%B8%B0/P-WIZ009.html',
          },
        ],
        desc: '헤드폰이랑 키보드 구매 기념으로 책상 한번 정리했습니다. 두개다 너무 맘에 드네요!',
      },
    ],
  },
  {
    id: '3',
    author: 'Sager79',
    name: '처음 올려보는 데스크 셋업',
    href: '/desk/4',
    imageSrc: 'https://static.waveon.io/img/apps/18146/desk6.png',
    imageAlt: '데스크',
    sections: [
      {
        id: 5,
        name: '처음 올려보는 데스크 셋업',
        images: [
          {
            id: 1,
            src: 'https://static.waveon.io/img/apps/18146/desk6.png',
            alt: '데스크',
            cover: true,
          },
          {
            id: 2,
            src: 'https://genibee.co.kr/web/product/big/202106/35b6de21554c8c4b66573d28758fcd26.jpg',
            alt: '지니비 GLS1-PRO 쿨러 노트북 거치대',
            cover: false,
          },
          {
            id: 3,
            src: 'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/164845042984873725.jpg?gif=1&w=850&h=850&c=c&webp=1',
            alt: '데미무드 메탈릭 실버 태블릿 거치대',
            cover: false,
          },
          {
            id: 4,
            src: 'http://www.thway.co.kr/data/file/product/30782476_y7ZNtLnK_84e7f214b678b061d0c651e48730038120b882b1.jpg',
            alt: '웨이코스 씽크웨이 토체티 D&T 콜라보 체리 키보드',
            cover: false,
          },
          {
            id: 5,
            src: 'https://shop-phinf.pstatic.net/20220626_224/16562493749663uNFL_JPEG/57385209574676963_985035511.JPG?type=m510',
            alt: '레트로 애플 XDA 키캡',
            cover: false,
          },
          {
            id: 6,
            src: 'https://willmidi.com/web/product/extra/big/202211/7dbcd10cb133c55d143f2aa963370efb.jpg',
            alt: '아투리아 MiniLab MK3',
            cover: false,
          },
          {
            id: 7,
            src: 'https://www.lge.co.kr/kr/images/monitors/md08748494/gallery/medium01.jpg',
            alt: 'LG 울트라 HD 모니터 32UN650',
            cover: false,
          },
        ],
        productInfo: [
          {
            id: 1,
            title: '지니비 GLS1-PRO 쿨러 노트북 거치대',
            desc: '디자인, 성능, 사용성까지. 다 갖춘 삼위일체 노트북 거치대.',
            category: '노트북 거치대',
            src: 'https://genibee.co.kr/web/product/big/202106/35b6de21554c8c4b66573d28758fcd26.jpg',
            alt: '지니비 GLS1-PRO 쿨러 노트북 거치대',
            link: 'https://genibee.co.kr/product/%EC%A7%80%EB%8B%88%EB%B9%84-gls1-pro-%EC%BF%A8%EB%9F%AC-%EB%85%B8%ED%8A%B8%EB%B6%81-%EA%B1%B0%EC%B9%98%EB%8C%80/29/',
          },
          {
            id: 2,
            title: '데미무드 메탈릭 실버 태블릿 거치대',
            desc: '인더스트리얼풍 인테리어에도, 모던풍 인테리어에도, 미드센추리풍 인테리어에도 찰떡인 다용도 거치대',
            category: '태블릿 거치대',
            src: 'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/164845042984873725.jpg?gif=1&w=850&h=850&c=c&webp=1',
            alt: '데미무드 메탈릭 실버 태블릿 거치대',
            link: 'https://ohou.se/productions/1268569/selling?affect_id=1&affect_type=StoreSearchResult',
          },
          {
            id: 3,
            title: '웨이코스 씽크웨이 토체티 D&T 콜라보 체리 키보드',
            desc: '키감의 정석, 토체티-토체프',
            category: '키보드',
            src: 'http://www.thway.co.kr/data/file/product/30782476_y7ZNtLnK_84e7f214b678b061d0c651e48730038120b882b1.jpg',
            alt: '웨이코스 씽크웨이 토체티 D&T 콜라보 체리 키보드',
            link: 'http://www.thway.co.kr/bbs/board.php?bo_table=product&wr_id=125',
          },
          {
            id: 4,
            title: '레트로 애플 XDA 키캡',
            desc: '심플한 화이트 구성과 레트로 감성',
            category: '키캡',
            src: 'https://shop-phinf.pstatic.net/20220626_224/16562493749663uNFL_JPEG/57385209574676963_985035511.JPG?type=m510',
            alt: '레트로 애플 XDA 키캡',
            link: 'https://smartstore.naver.com/keycapburger/products/6065719642',
          },
          {
            id: 5,
            title: '아투리아 MiniLab MK3',
            desc: '사운드, 디자인, 휴대성을 모두 갖춘 유니버셜 키보드 컨트롤러',
            category: '미디컨트롤러',
            src: 'https://willmidi.com/web/product/extra/big/202211/7dbcd10cb133c55d143f2aa963370efb.jpg',
            alt: '아투리아 MiniLab MK3',
            link: 'https://willmidi.com/product/%EC%95%84%ED%88%AC%EB%A6%AC%EC%95%84-minilab-mk3-%EB%AF%B8%EB%8B%88%EB%9E%A9-minilab3-%EB%AF%B8%EB%94%94%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC-%EB%A7%88%EC%8A%A4%ED%84%B0%ED%82%A4%EB%B3%B4%EB%93%9C/3445/2',
          },
          {
            id: 6,
            title: 'LG 울트라 HD 모니터 32UN650',
            desc: '울트라HD 4K로 즐기는 생생하고 선명한 화질',
            category: '모니터',
            src: 'https://www.lge.co.kr/kr/images/monitors/md08748494/gallery/medium01.jpg',
            alt: 'LG 울트라 HD 모니터 32UN650',
            link: 'https://www.lge.co.kr/monitors/32un650',
          },
        ],
        desc: '선을 안보이게 숨긴다고 숨겼는데도 눈에 띄네요. 플렌테리어도 시도중인데 잘 못키울까봐 더 늘리지는 못하고 있습니다. ㅜㅜㅋㅋ 키보드 키캡 바꾼김에 사진찍으려다가 책상정리만 한시간 했네요ㅎㅎ',
      },
    ],
  },
  {
    id: '4',
    author: 'BradLeejh',
    name: '그동안 데스크셋업 변화과정 - 1편',
    href: '/desk/5',
    imageSrc: 'https://static.waveon.io/img/apps/18146/7.jpeg',
    imageAlt: '데스크',
    sections: [
      {
        id: 6,
        name: '처음 올려보는 데스크 셋업',
        images: [
          {
            id: 1,
            src: 'https://static.waveon.io/img/apps/18146/7.jpeg',
            alt: '데스크',
            cover: true,
          },
          {
            id: 2,
            src: 'https://www.realforce.co.jp/en/products/R3HH21/images/mainphoto.jpg',
            alt: 'Realforce R3 KEYBOARD for Mac',
            cover: false,
          },
          {
            id: 3,
            src: 'https://resource.logitech.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1',
            alt: '로지텍 MX MASTER 3S',
            cover: false,
          },
          {
            id: 4,
            src: 'https://image7.coupangcdn.com/image/rs_quotation_api/srghvoxe/d622700a5cff426c8de55b542035da0a.jpg',
            alt: '미니플 인테리어 캔버스 액자 그림 A',
            cover: false,
          },
          {
            id: 5,
            src: 'https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dw4c43314c/images/hi-res/a/139612314_WIZ017-BLK_3in1WirelessChargingDock_Hero_WEB.png?sw=700&sh=700&sm=fit',
            alt: '벨킨 3 in 1 충전기',
            cover: false,
          },
        ],
        productInfo: [
          {
            id: 1,
            title: 'Realforce R3 KEYBOARD for Mac',
            desc: 'Realforce R3 KEYBOARD for Mac',
            category: '키보드',
            src: 'https://www.realforce.co.jp/en/products/R3HH21/images/mainphoto.jpg',
            alt: 'Realforce R3 KEYBOARD for Mac',
            link: 'https://www.realforce.co.jp/en/products/R3HH21/',
          },
          {
            id: 2,
            title: '로지텍 MX MASTER 3S',
            desc: '',
            category: '마우스',
            src: 'https://resource.logitech.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1',
            alt: '로지텍 MX MASTER 3S',
            link: 'https://search.shopping.naver.com/search/all?query=%EB%A1%9C%EC%A7%80%ED%85%8D%20MX%20MASTER%203S&prevQuery=AZIO%20Cascade%20Slim',
          },
          {
            id: 3,
            title: '미니플 인테리어 캔버스 액자 그림 A',
            desc: '미니플 인테리어 캔버스 액자 그림 A',
            category: '액자',
            src: 'https://image7.coupangcdn.com/image/rs_quotation_api/srghvoxe/d622700a5cff426c8de55b542035da0a.jpg',
            alt: '미니플 인테리어 캔버스 액자 그림 A',
            link: 'https://www.coupang.com/vp/products/6183576898?itemId=12158408991&vendorItemId=79429854335',
          },
          {
            id: 4,
            title: 'Belkin iPhone용 3-in-1 MagSafe 무선 충전기',
            desc: '',
            category: '충전기',
            src: 'https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dw4c43314c/images/hi-res/a/139612314_WIZ017-BLK_3in1WirelessChargingDock_Hero_WEB.png?sw=700&sh=700&sm=fit',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            link: 'https://search.shopping.naver.com/search/all?query=%EB%B2%A8%ED%82%A8%203%20In%201&cat_id=&frm=NVSHATC',
          },
        ],
        desc: '이것저것 많이 해봤는데 결국에는 원초적으로 미니멀하게 돌아오게 되는거 같네요..위부터 변화과정입니다. 맥북은 사무실에서 사용하고 맥미니는 홈오피스용으로 사용중입니다',
      },
    ],
  },
  {
    id: '5',
    author: 'cnscjs13',
    name: '스튜디오 디스플레이 너무 만족스럽네요 ㅎ',
    href: '/desk/6',
    imageSrc: 'https://static.waveon.io/img/apps/18146/IMG_0226 (1).jpeg',
    imageAlt: '데스크',
    sections: [
      {
        id: 7,
        name: '처음 올려보는 데스크 셋업',
        images: [
          {
            id: 1,
            src: 'https://static.waveon.io/img/apps/18146/IMG_0226 (1).jpeg',
            alt: '데스크',
            cover: true,
          },
          {
            id: 2,
            src: 'https://static.waveon.io/img/apps/18146/IMG_0227.jpeg',
            alt: '데스크',
            cover: true,
          },
          {
            id: 3,
            src: 'https://resource.logitech.com/content/dam/logitech/en/products/keyboards/mx-mechanical-mini-mac/gallery/pale-grey/mx-mechanical-mini-for-mac-keyboard-top-view-pale-grey-kor.png',
            alt: 'MX MECHANICAL MINI',
            cover: false,
          },
          {
            id: 4,
            src: 'https://resource.logitech.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1',
            alt: '로지텍 MX MASTER 3S',
            cover: false,
          },
          {
            id: 5,
            src: 'https://ecimg.cafe24img.com/pg224b01424999016/greedyfarmers1/web/product/big/20230110/bf525dbfdc2f0a737205f9836065ee97.jpg',
            alt: '마우스 패드',
            cover: false,
          },
          {
            id: 6,
            src: 'https://thumb.sixshop.kr/uploadedFiles/107382/product/image_1602839011244.jpg?width=2500',
            alt: '포스터',
            cover: false,
          },
          {
            id: 7,
            src: 'https://img.29cm.co.kr/next-product/2022/09/08/d0c845a8611f4ee78be8cdec8dbb38dd_20220908113354.jpg?width=700',
            alt: '선인장',
            cover: false,
          },
          {
            id: 8,
            src: 'https://image.msscdn.net/images/prd_img/20220727/2684061/detail_2684061_2_500.jpg',
            alt: '조명',
            cover: false,
          },
        ],
        productInfo: [
          {
            id: 1,
            title: 'MX MECHANICAL MINI for Mac',
            desc: 'MX MECHANICAL MINI',
            category: '키보드',
            src: 'https://resource.logitech.com/content/dam/logitech/en/products/keyboards/mx-mechanical-mini-mac/gallery/pale-grey/mx-mechanical-mini-for-mac-keyboard-top-view-pale-grey-kor.png',
            alt: 'Realforce R3 KEYBOARD for Mac',
            link: 'https://search.shopping.naver.com/search/all?query=%EB%A1%9C%EC%A7%80%ED%85%8D%20mx%20mechanical%20for%20mac&cat_id=&frm=NVSHATC',
          },
          {
            id: 2,
            title: '로지텍 MX MASTER 3S',
            desc: '로지텍 MX MASTER 3S',
            category: '마우스',
            src: 'https://resource.logitech.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1',
            alt: '로지텍 MX MASTER 3S',
            link: 'https://search.shopping.naver.com/search/all?query=%EB%A1%9C%EC%A7%80%ED%85%8D%20MX%20MASTER%203S&prevQuery=AZIO%20Cascade%20Slim',
          },
          {
            id: 3,
            title: 'Greedy Farmers 마우스 패드',
            desc: 'Greedy Farmers 마우스 패드',
            category: '마우스 패드',
            src: 'https://ecimg.cafe24img.com/pg224b01424999016/greedyfarmers1/web/product/big/20230110/bf525dbfdc2f0a737205f9836065ee97.jpg',
            alt: '미니플 인테리어 캔버스 액자 그림 A',
            link: 'https://greedyfarmers.com/product/%EB%A7%88%EC%9A%B0%EC%8A%A4%ED%8C%A8%EB%93%9C-19-colors/126/category/76/display/1/',
          },
          {
            id: 4,
            title: 'NU-BRANDING POSTER',
            desc: '',
            category: '포스터',
            src: 'https://thumb.sixshop.kr/uploadedFiles/107382/product/image_1602839011244.jpg?width=2500',
            alt: 'NU-BRANDING POSTER',
            link: 'https://mobetterworks.com/product/nubrandingposter',
          },
          {
            id: 5,
            title: 'Table garden - 다육이로 만드는 책상정원 (플랜트세트)',
            desc: '',
            category: '식물',
            src: 'https://img.29cm.co.kr/next-product/2022/09/08/d0c845a8611f4ee78be8cdec8dbb38dd_20220908113354.jpg?width=700',
            alt: 'Table garden - 다육이로 만드는 책상정원 (플랜트세트)',
            link: 'https://product.29cm.co.kr/catalog/1679102',
          },
          {
            id: 6,
            title: '렉슨 MINA L사이즈 미나 조명 램프',
            desc: '',
            category: '조명',
            src: 'https://image.msscdn.net/images/prd_img/20220727/2684061/detail_2684061_2_500.jpg',
            alt: '렉슨 MINA L사이즈 미나 조명 램프',
            link: 'https://www.musinsa.com/app/goods/2684061?utm_source=google_shopping&utm_medium=sh&source=GOSHSAP001&gclid=Cj0KCQjwqNqkBhDlARIsAFaxvwzWuaLNjYDpaJRBhLnbhIO8jUXz0YYpr1D19HCV_7mOpRprPr99b5caAok7EALw_wcB',
          },
        ],
        desc: '이것저것 많이 해봤는데 결국에는 원초적으로 미니멀하게 돌아오게 되는거 같네요..위부터 변화과정입니다. 맥북은 사무실에서 사용하고 맥미니는 홈오피스용으로 사용중입니다',
      },
    ],
  },
]

export default desks
