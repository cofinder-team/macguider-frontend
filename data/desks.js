export const category = {
  desk: '데스크',
  chair: '의자',
  monitor: '모니터',
  mac: 'mac',
  ipad: 'iPad',
  phone: 'iPhone',
  mouse: '마우스',
  dock: '독',
  keyboard: '키보드',
  charger: '충전기',
  trackpad: '트랙패드',
  deskMat: '데스크매트',
  shelf: '선반',
  lamp: '조명',
  speaker: '스피커',
  headphone: '헤드폰',
  plant: '식물',
  poster: '포스터',
  mousePad: '마우스 패드',
  pictureFrame: '액자',
  monitorArm: '모니터암',
}

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
          },
          {
            id: 2,
            src: 'https://static.waveon.io/img/apps/18146/desk2.png',
            alt: 'desk-image-2',
          },
        ],
        productInfo: [
          {
            id: 1,
            title: 'AZIO Cascade Slim',
            desc: '',
            category: category.keyboard,
            src: 'https://m.media-amazon.com/images/I/81PqtjKHVlL.jpg',
            alt: 'AZIO Cascade Slim',
            link: 'https://search.shopping.naver.com/search/all?query=AZIO+Cascade+Slim&bt=-1&frm=NVSCPRO',
          },
          {
            id: 2,
            title: '로지텍 MX MASTER 3S',
            desc: '',
            category: category.mouse,
            src: 'https://resource.logitech.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1',
            alt: '로지텍 MX MASTER 3S',
            link: 'https://search.shopping.naver.com/search/all?query=%EB%A1%9C%EC%A7%80%ED%85%8D%20MX%20MASTER%203S&prevQuery=AZIO%20Cascade%20Slim',
          },
          {
            id: 3,
            title: 'Magic Trackpad - 화이트 Multi-Touch 표면',
            desc: '',
            category: category.trackpad,
            src: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MK2D3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1626390718000',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            link: 'https://search.shopping.naver.com/search/all?query=Magic%20Trackpad&prevQuery=%EB%A1%9C%EC%A7%80%ED%85%8D%20MX%20MASTER%203S',
          },
          {
            id: 4,
            title: 'MAYWOOD 풀사이즈 데스크선반',
            desc: '',
            category: category.shelf,
            src: 'https://caldigitkr.cafe24.com/web/product/medium/202306/0e3deb5023001d955674275d4b37062e.jpg',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            link: 'https://caldigitkr.cafe24.com/shop3/product/detail.html?product_no=35&cate_no=48&display_group=1',
          },
          {
            id: 5,
            title: 'Minimalistic Desk Mat',
            desc: '',
            category: category.deskMat,
            src: 'https://cdn.shopify.com/s/files/1/0281/7930/0487/products/DeltahubDeskpadSmall_1024x1024_crop_center.jpg?v=1681816344',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            link: 'https://us.deltahub.io/products/minimalistic-desk-pad',
          },
          {
            id: 6,
            title: 'Belkin iPhone용 3-in-1 MagSafe 무선 충전기',
            desc: '',
            category: category.charger,
            src: 'https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dw4c43314c/images/hi-res/a/139612314_WIZ017-BLK_3in1WirelessChargingDock_Hero_WEB.png?sw=700&sh=700&sm=fit',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            link: 'https://search.shopping.naver.com/search/all?query=%EB%B2%A8%ED%82%A8%203%20In%201&cat_id=&frm=NVSHATC',
          },
          {
            id: 7,
            title: 'CalDigit | TS4',
            desc: '썬더볼트 4독 중에 단연 최고',
            category: category.dock,
            src: 'https://m.caldigit.co.kr/web/product/big/202204/328f0a870b89aaa891d3eb1e2f8ba09c.jpg',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            link: 'https://caldigit.co.kr/product/ts4/9/',
          },
        ],
        appleProducts: [
          {
            id: '5',
            optionId: 1,
            category: category.mac,
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
        appleProducts: [
          {
            id: '5',
            optionId: 1,
          },
        ],
        desc: '여기는 제 아내가 사용하는 사이드 테이블입니다. 아내 셋업은 너무 초라한게 아닌가 생각하실수도 있지만,,,ㅎㅎ 여기는 어디까지나 저의 방(저만의 아지트)이며 아내가 함께 빌려 쓰고 있기 때문에 아내의 장비들은 왠만하면 놓지 못하게 하고 있습니다. 대신 제가 사무실에 있을때는 아내는 썬더볼트 독으로 맥북을 연결해 제 메인 셋업을 이용합니다. 그럴때마다 제 키보드와 데스크매트 위치 바뀌어 있는거보면 잔소리를 하게 되죠 하...',
      },
    ],
  },
  {
    id: '2',
    author: 'Sager79',
    name: '처음 올려보는 데스크 셋업',
    href: '/desk/2',
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
            category: category.keyboard,
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
            category: category.monitor,
            src: 'https://www.lge.co.kr/kr/images/monitors/md08748494/gallery/medium01.jpg',
            alt: 'LG 울트라 HD 모니터 32UN650',
            link: 'https://www.lge.co.kr/monitors/32un650',
          },
        ],
        appleProducts: [
          {
            id: '4',
            optionId: 1,
            category: category.mac,
          },
        ],
        desc: '선을 안보이게 숨긴다고 숨겼는데도 눈에 띄네요. 플렌테리어도 시도중인데 잘 못키울까봐 더 늘리지는 못하고 있습니다. ㅜㅜㅋㅋ 키보드 키캡 바꾼김에 사진찍으려다가 책상정리만 한시간 했네요ㅎㅎ',
      },
    ],
  },
  {
    id: '3',
    author: 'BradLeejh',
    name: '그동안 데스크셋업 변화과정 - 1편',
    href: '/desk/3',
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
          },
        ],
        productInfo: [
          {
            id: 1,
            title: 'Realforce R3 KEYBOARD for Mac',
            desc: 'Realforce R3 KEYBOARD for Mac',
            category: category.keyboard,
            src: 'https://www.realforce.co.jp/en/products/R3HH21/images/mainphoto.jpg',
            alt: 'Realforce R3 KEYBOARD for Mac',
            link: 'https://www.realforce.co.jp/en/products/R3HH21/',
          },
          {
            id: 2,
            title: '로지텍 MX MASTER 3S',
            desc: '',
            category: category.mouse,
            src: 'https://resource.logitech.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1',
            alt: '로지텍 MX MASTER 3S',
            link: 'https://search.shopping.naver.com/search/all?query=%EB%A1%9C%EC%A7%80%ED%85%8D%20MX%20MASTER%203S&prevQuery=AZIO%20Cascade%20Slim',
          },
          {
            id: 3,
            title: '미니플 인테리어 캔버스 액자 그림 A',
            desc: '미니플 인테리어 캔버스 액자 그림 A',
            category: category.pictureFrame,
            src: 'https://image7.coupangcdn.com/image/rs_quotation_api/srghvoxe/d622700a5cff426c8de55b542035da0a.jpg',
            alt: '미니플 인테리어 캔버스 액자 그림 A',
            link: 'https://www.coupang.com/vp/products/6183576898?itemId=12158408991&vendorItemId=79429854335',
          },
          {
            id: 4,
            title: 'Belkin iPhone용 3-in-1 MagSafe 무선 충전기',
            desc: '',
            category: category.charger,
            src: 'https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dw4c43314c/images/hi-res/a/139612314_WIZ017-BLK_3in1WirelessChargingDock_Hero_WEB.png?sw=700&sh=700&sm=fit',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            link: 'https://search.shopping.naver.com/search/all?query=%EB%B2%A8%ED%82%A8%203%20In%201&cat_id=&frm=NVSHATC',
          },
        ],
        appleProducts: [
          {
            id: '1',
            optionId: 1,
            category: category.mac,
          },
        ],
        desc: '이것저것 많이 해봤는데 결국에는 원초적으로 미니멀하게 돌아오게 되는거 같네요..위부터 변화과정입니다. 맥북은 사무실에서 사용하고 맥미니는 홈오피스용으로 사용중입니다',
      },
    ],
  },
  {
    id: '4',
    author: 'cnscjs13',
    name: '스튜디오 디스플레이 너무 만족스럽네요 ㅎ',
    href: '/desk/4',
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
          },
          {
            id: 2,
            src: 'https://static.waveon.io/img/apps/18146/IMG_0227.jpeg',
            alt: '데스크',
          },
        ],
        productInfo: [
          {
            id: 1,
            title: 'MX MECHANICAL MINI for Mac',
            desc: 'MX MECHANICAL MINI',
            category: category.keyboard,
            src: 'https://resource.logitech.com/content/dam/logitech/en/products/keyboards/mx-mechanical-mini-mac/gallery/pale-grey/mx-mechanical-mini-for-mac-keyboard-top-view-pale-grey-kor.png',
            alt: 'Realforce R3 KEYBOARD for Mac',
            link: 'https://search.shopping.naver.com/search/all?query=%EB%A1%9C%EC%A7%80%ED%85%8D%20mx%20mechanical%20for%20mac&cat_id=&frm=NVSHATC',
          },
          {
            id: 2,
            title: '로지텍 MX MASTER 3S',
            desc: '로지텍 MX MASTER 3S',
            category: category.mouse,
            src: 'https://resource.logitech.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1',
            alt: '로지텍 MX MASTER 3S',
            link: 'https://search.shopping.naver.com/search/all?query=%EB%A1%9C%EC%A7%80%ED%85%8D%20MX%20MASTER%203S&prevQuery=AZIO%20Cascade%20Slim',
          },
          {
            id: 3,
            title: 'Greedy Farmers 마우스 패드',
            desc: 'Greedy Farmers 마우스 패드',
            category: category.mousePad,
            src: 'https://ecimg.cafe24img.com/pg224b01424999016/greedyfarmers1/web/product/big/20230110/bf525dbfdc2f0a737205f9836065ee97.jpg',
            alt: '미니플 인테리어 캔버스 액자 그림 A',
            link: 'https://greedyfarmers.com/product/%EB%A7%88%EC%9A%B0%EC%8A%A4%ED%8C%A8%EB%93%9C-19-colors/126/category/76/display/1/',
          },
          {
            id: 4,
            title: 'NU-BRANDING POSTER',
            desc: '',
            category: category.poster,
            src: 'https://thumb.sixshop.kr/uploadedFiles/107382/product/image_1602839011244.jpg?width=2500',
            alt: 'NU-BRANDING POSTER',
            link: 'https://mobetterworks.com/product/nubrandingposter',
          },
          {
            id: 5,
            title: 'Table garden - 다육이로 만드는 책상정원 (플랜트세트)',
            desc: '',
            category: category.plant,
            src: 'https://img.29cm.co.kr/next-product/2022/09/08/d0c845a8611f4ee78be8cdec8dbb38dd_20220908113354.jpg?width=700',
            alt: 'Table garden - 다육이로 만드는 책상정원 (플랜트세트)',
            link: 'https://product.29cm.co.kr/catalog/1679102',
          },
          {
            id: 6,
            title: '렉슨 MINA L사이즈 미나 조명 램프',
            desc: '',
            category: category.lamp,
            src: 'https://image.msscdn.net/images/prd_img/20220727/2684061/detail_2684061_2_500.jpg',
            alt: '렉슨 MINA L사이즈 미나 조명 램프',
            link: 'https://www.musinsa.com/app/goods/2684061?utm_source=google_shopping&utm_medium=sh&source=GOSHSAP001&gclid=Cj0KCQjwqNqkBhDlARIsAFaxvwzWuaLNjYDpaJRBhLnbhIO8jUXz0YYpr1D19HCV_7mOpRprPr99b5caAok7EALw_wcB',
          },
          {
            id: 7,
            title: 'Apple Studio Display',
            desc: '',
            category: category.monitor,
            src: 'https://static.waveon.io/img/apps/18146/studio-display-gallery-1-202203.jpeg',
            alt: '애플 스튜디오 디스플레이',
            link: 'https://www.apple.com/kr/shop/buy-mac/apple-studio-display',
          },
        ],
        appleProducts: [
          {
            id: '4',
            optionId: 1,
            category: category.mac,
          },
        ],
        desc: '그저 영롱합니다... 화질도 너무 좋고 만족도 최상이네요!',
      },
    ],
  },
  {
    id: '5',
    author: 'whdgus427',
    name: ' 작은 이케아 데스크에 꾸민 스튜디오디스플레이',
    href: '/desk/5',
    imageSrc: 'https://static.waveon.io/img/apps/18146/39ae41cc75188e.webp',
    imageAlt: '데스크',
    sections: [
      {
        id: 8,
        name: '처음 올려보는 데스크 셋업',
        images: [
          {
            id: 1,
            src: 'https://static.waveon.io/img/apps/18146/39ae41cc75188e.webp',
            alt: '데스크',
          },
          {
            id: 2,
            src: 'https://static.waveon.io/img/apps/18146/ezgif-4-3a3cc15399.jpg',
            alt: '데스크',
          },
        ],
        productInfo: [
          {
            id: 1,
            title: '로지텍 Mac용 MX Keys Mini',
            desc: '로지텍 Mac용 MX Keys Mini',
            category: category.keyboard,
            src: 'https://resource.logitech.com/content/dam/logitech/en/products/keyboards/mx-keys-mini-for-mac/gallery/kor/mx-keys-mini-top-mac-kor.png',
            alt: '로지텍 Mac용 MX Keys Mini',
            link: 'https://search.shopping.naver.com/search/all?query=%EB%A1%9C%EC%A7%80%ED%85%8D+MX+keys+mini&bt=-1&frm=NVSCPRO',
          },
          {
            id: 2,
            title: '로지텍 MX Anywhere 3S',
            desc: '로지텍 MX Anywhere 3S',
            category: category.mouse,
            src: 'https://resource.logitech.com/w_800,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-anywhere-3s/product-gallery/pale-grey/mx-anywhere-3s-mouse-top-view-pale-grey.png?v=1',
            alt: '로지텍 MX Anywhere 3S',
            link: 'https://search.shopping.naver.com/catalog/40373959618?cat_id=50002927&frm=NVSCMOD&query=%EB%A1%9C%EC%A7%80%ED%85%8D+MX+Anywhere+3S&NaPm=ct%3Dljk035hk%7Cci%3D45dce44e633cf5e7c7b4bfed36d94afbc216cffa%7Ctr%3Dsls%7Csn%3D95694%7Chk%3D2f5d57584673a098940d648b5c6def18743c4317',
          },
          {
            id: 3,
            title: 'Magic Trackpad - 화이트 Multi-Touch 표면',
            desc: '',
            category: category.trackpad,
            src: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MK2D3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1626390718000',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            link: 'https://search.shopping.naver.com/search/all?query=Magic%20Trackpad&prevQuery=%EB%A1%9C%EC%A7%80%ED%85%8D%20MX%20MASTER%203S',
          },
          {
            id: 4,
            title: '사테치 USB-C 클램프 허브 24인치',
            desc: '',
            category: category.dock,
            src: 'https://cdn.funshop.co.kr//products/0000141614/vs_image800.jpg?1688215860',
            alt: 'NU-BRANDING POSTER',
            link: 'https://search.shopping.naver.com/search/all?query=%EC%82%AC%ED%85%8C%EC%B9%98+%EC%95%84%EC%9D%B4%EB%A7%A524&bt=-1&frm=NVSCPRO',
          },
          {
            id: 5,
            title: '렉슨 MINA L사이즈 미나 조명 램프',
            desc: '',
            category: category.lamp,
            src: 'https://image.msscdn.net/images/prd_img/20220727/2684061/detail_2684061_2_500.jpg',
            alt: '렉슨 MINA L사이즈 미나 조명 램프',
            link: 'https://www.musinsa.com/app/goods/2684061?utm_source=google_shopping&utm_medium=sh&source=GOSHSAP001&gclid=Cj0KCQjwqNqkBhDlARIsAFaxvwzWuaLNjYDpaJRBhLnbhIO8jUXz0YYpr1D19HCV_7mOpRprPr99b5caAok7EALw_wcB',
          },
          {
            id: 6,
            title: 'Apple Studio Display',
            desc: '',
            category: category.monitor,
            src: 'https://static.waveon.io/img/apps/18146/studio-display-gallery-1-202203.jpeg',
            alt: '애플 스튜디오 디스플레이',
            link: 'https://www.apple.com/kr/shop/buy-mac/apple-studio-display',
          },
          {
            id: 7,
            title: '어고트론 LX Desk Mount LCD Arm',
            desc: '',
            category: category.monitor,
            src: 'https://img.danawa.com/prod_img/500000/465/409/img/1409465_1.jpg?shrink=330:*&_v=20220802141925',
            alt: '어고트론 LX Desk Mount LCD Arm',
            link: 'https://prod.danawa.com/info/?pcode=1409465',
          },
        ],
        appleProducts: [
          {
            id: '4',
            optionId: 1,
            category: category.mac,
          },
        ],
        desc: '이케아 릴로센 책상 102x49 cm에 스튜디오 디스플레이 하나 놓으니까 책상이 꽉차버리네요. 작은 책상이 좁아서 불편하긴 하지만 집중이 더 잘되고 공간이 잘 활용돼서 좋은 것 같습니다.',
      },
    ],
  },
  {
    id: '6',
    author: 'BradLeejh',
    name: '그동안 데스크셋업 변화과정 - 2편',
    href: '/desk/6',
    imageSrc: 'https://static.waveon.io/img/apps/18146/6.jpeg',
    imageAlt: '데스크',
    sections: [
      {
        id: 6,
        name: '처음 올려보는 데스크 셋업',
        images: [
          {
            id: 1,
            src: 'https://static.waveon.io/img/apps/18146/6.jpeg',
            alt: '데스크',
          },
        ],
        productInfo: [
          {
            id: 2,
            title: '로지텍 MX MASTER 3S',
            desc: '',
            category: category.mouse,
            src: 'https://resource.logitech.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1',
            alt: '로지텍 MX MASTER 3S',
            link: 'https://search.shopping.naver.com/search/all?query=%EB%A1%9C%EC%A7%80%ED%85%8D%20MX%20MASTER%203S&prevQuery=AZIO%20Cascade%20Slim',
          },
          {
            id: 3,
            title: '아이존아이앤디 클램프형 노트북 거치대 EZ NTS-C1 최대 17형',
            desc: '미니플 인테리어 캔버스 액자 그림 A',
            category: category.monitorArm,
            src: 'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5241893302/B.jpg?533000000',
            alt: '아이존아이앤디 클램프형 노트북 거치대 EZ NTS-C1 최대 17형',
            link: 'https://www.11st.co.kr/products/5241893302?gclid=Cj0KCQjwnf-kBhCnARIsAFlg491PfXFs4amKN5Obrl1_fxu8u_P1UJatazEl9unW1YVlG853zuJZqRwaArB1EALw_wcB&utm_term=&utm_campaign=googleshopping_pc_basic_new&utm_source=%B1%B8%B1%DB_PC_S_%BC%EE%C7%CE&utm_medium=%B0%CB%BB%F6',
          },
          {
            id: 4,
            title: 'Belkin iPhone용 3-in-1 MagSafe 무선 충전기',
            desc: '',
            category: category.charger,
            src: 'https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dw4c43314c/images/hi-res/a/139612314_WIZ017-BLK_3in1WirelessChargingDock_Hero_WEB.png?sw=700&sh=700&sm=fit',
            alt: 'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
            link: 'https://search.shopping.naver.com/search/all?query=%EB%B2%A8%ED%82%A8%203%20In%201&cat_id=&frm=NVSHATC',
          },
          {
            id: 5,
            title: '렉슨 MINA L사이즈 미나 조명 램프',
            desc: '',
            category: category.lamp,
            src: 'https://image.msscdn.net/images/prd_img/20220727/2684061/detail_2684061_2_500.jpg',
            alt: '렉슨 MINA L사이즈 미나 조명 램프',
            link: 'https://www.musinsa.com/app/goods/2684061?utm_source=google_shopping&utm_medium=sh&source=GOSHSAP001&gclid=Cj0KCQjwqNqkBhDlARIsAFaxvwzWuaLNjYDpaJRBhLnbhIO8jUXz0YYpr1D19HCV_7mOpRprPr99b5caAok7EALw_wcB',
          },
          {
            id: 6,
            title: '미니플 인테리어 캔버스 액자 그림 A',
            desc: '미니플 인테리어 캔버스 액자 그림 A',
            category: category.pictureFrame,
            src: 'https://image7.coupangcdn.com/image/rs_quotation_api/srghvoxe/d622700a5cff426c8de55b542035da0a.jpg',
            alt: '미니플 인테리어 캔버스 액자 그림 A',
            link: 'https://www.coupang.com/vp/products/6183576898?itemId=12158408991&vendorItemId=79429854335',
          },
          {
            id: 7,
            title: '마샬 엠버튼II 휴대용 블루투스 스피커 화이트',
            desc: '미니플 인테리어 캔버스 액자 그림 A',
            category: category.speaker,
            src: 'https://sitem.ssgcdn.com/81/66/14/item/1000533146681_i1_1100.jpg',
            alt: '미니플 인테리어 캔버스 액자 그림 A',
            link: 'https://www.ssg.com/item/itemView.ssg?itemId=1000533146681&ckwhere=ssg_gshopsa&gclid=Cj0KCQjwnf-kBhCnARIsAFlg490so9Ukwh1sLtJmyX2JkF3sZhrrlME6zaei3YQ8yDTTG3KYqvBcAUwaAvixEALw_wcB',
          },
        ],
        appleProducts: [
          {
            id: '2',
            optionId: 1,
            category: category.mac,
          },
          {
            id: '9',
            optionId: 9,
            category: category.ipad,
          },
        ],
        desc: '이것저것 많이 해봤는데 결국에는 원초적으로 미니멀하게 돌아오게 되는거 같네요..위부터 변화과정입니다. 맥북은 사무실에서 사용하고 맥미니는 홈오피스용으로 사용중입니다',
      },
    ],
  },
]

export default desks
