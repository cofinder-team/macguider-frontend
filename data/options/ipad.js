const optionsIpad = [
  {
    id: '6',
    model: 'iPad mini',
    releasedDateHistory: ['2021-09-13', '2019-03-17', '2015-09-08', '2014-10-15', '2013-10-21'],
    desc: '이전 세대에 비해 더 커진 8.3인치 디스플레이와 A15 Bionic, 터치 ID, 그리고 2세대 Apple Pencil을 지원합니다. 오랫동안 업데이트가 되지 않은 만큼 곧 새로운 모델이 출시될 것으로 예상됩니다.',
    href: '/prices/ipad/ipad-mini?optionId=1',
    price: 769000, // 가장 최신 제품의 기본형의 가격
    imgSrc: '/static/images/ipads/ipad-mini-2019.jpeg', // 대표 이미지
    data: [
      {
        title: 'iPad mini',
        alias: 'iPad mini',
        imgSrc: '/static/images/ipads/ipad-mini-2019.jpeg',
        href: '/prices/ipad/ipad-mini?optionId=1',
        isDeprecated: false, // 단종 여부
        releasedDate: '2020-11-10',
        colors: ['스페이스 그레이', '핑크', '퍼플', '스타라이트'],
        specs: {
          year: '2020',
          cpu: 'A15 Bionic',
          gen: 6,
        },
        options: [
          {
            id: 1,
            connectivity: 'wifi',
            ssd: '64GB',
            price: 769000,
          },
          {
            id: 2,
            connectivity: 'wifi',
            ssd: '256GB',
            price: 1009000,
          },
          {
            id: 3,
            connectivity: 'cellular',
            ssd: '64GB',
            price: 1009000,
          },
          {
            id: 4,
            connectivity: 'cellular',
            ssd: '256GB',
            price: 1249000,
          },
        ],
      },
    ],
  },
  {
    id: '7',
    model: 'iPad Air',
    releasedDateHistory: ['2022-03-08', '2020-09-14', '2019-03-17', '2014-10-15', '2013-10-21'],
    desc: 'M1을 탑재한 iPad Air 는  10.9인치 Liquid Retina 디스플레이와 터치 ID, 2세대 Apple Pencil을 지원합니다. 출시주기 막바지에 다른만큼 곧 새로운 모델이 출시될 것으로 예상됩니다.',
    href: '/prices/ipad/ipad-air?optionId=5',
    price: 929000, // 가장 최신 제품의 기본형의 가격
    imgSrc: '/static/images/ipads/ipad-air-2022.jpeg', // 대표 이미지
    data: [
      {
        title: 'iPad Air',
        alias: 'iPad Air',
        imgSrc: '/static/images/ipads/ipad-air-2020.jpg',
        href: '/prices/ipad/ipad-air?optionId=1',
        isDeprecated: true, // 단종 여부
        releasedDate: '2020-09-14',
        colors: ['스페이스 그레이', '실버', '로즈 골드', '스카이 블루', '그린'],
        specs: {
          year: '2020',
          cpu: 'A14 Bionic',
          gen: 4,
        },
        options: [
          {
            id: 1,
            connectivity: 'wifi',
            ssd: '64GB',
          },
          {
            id: 2,
            connectivity: 'wifi',
            ssd: '256GB',
          },
          {
            id: 3,
            connectivity: 'cellular',
            ssd: '64GB',
          },
          {
            id: 4,
            connectivity: 'cellular',
            ssd: '256GB',
          },
        ],
      },
      {
        title: 'iPad Air',
        alias: 'iPad Air',
        imgSrc: '/static/images/ipads/ipad-air-2022.jpeg',
        href: '/prices/ipad/ipad-air?optionId=5',
        isDeprecated: false, // 단종 여부
        releasedDate: '2022-03-08',
        colors: ['스페이스 그레이', '블루', '핑크', '퍼플', '스타라이트'],
        specs: {
          year: '2022',
          cpu: 'M1',
          gen: 5,
        },
        options: [
          {
            id: 5,
            connectivity: 'wifi',
            ssd: '64GB',
            price: 929000,
          },
          {
            id: 6,
            connectivity: 'wifi',
            ssd: '256GB',
            price: 1169000,
          },
          {
            id: 7,
            connectivity: 'cellular',
            ssd: '64GB',
            price: 1169000,
          },
          {
            id: 8,
            connectivity: 'cellular',
            ssd: '256GB',
            price: 1409000,
          },
        ],
      },
    ],
  },
  {
    id: '8',
    model: 'iPad',
    desc: '새롭게 리뉴얼된 iPad는 10.9인치 Liquid Retina 디스플레이, A14 Bionic, 터치 ID를 탑재하였고 1세대 Apple Pencil을 지원합니다.',
    href: '/prices/ipad/ipad?optionId=9',
    releasedDateHistory: ['2022-10-17', '2021-09-13', '2020-09-14', '2019-09-09', '2018-03-26'],
    price: 679000, // 가장 최신 제품의 기본형의 가격
    imgSrc: '/static/images/ipads/ipad-2022.jpeg', // 대표 이미지
    data: [
      {
        title: 'iPad',
        alias: 'iPad',
        imgSrc: '/static/images/ipads/ipad-2020.jpeg',
        href: '/prices/ipad/ipad?optionId=1',
        isDeprecated: true, // 단종 여부
        releasedDate: '2020-09-14',
        colors: ['스페이스 그레이', '실버'],
        specs: {
          year: '2020',
          cpu: 'A12 Bionic',
          gen: 8,
        },
        options: [
          {
            id: 1,
            connectivity: 'wifi',
            ssd: '32GB',
          },
          {
            id: 2,
            connectivity: 'wifi',
            ssd: '128GB',
          },
          {
            id: 3,
            connectivity: 'cellular',
            ssd: '32GB',
          },
          {
            id: 4,
            connectivity: 'cellular',
            ssd: '128GB',
          },
        ],
      },
      {
        title: 'iPad',
        alias: 'iPad',
        imgSrc: '/static/images/ipads/ipad-2021.jpeg',
        href: '/prices/ipad/ipad?optionId=5',
        isDeprecated: false, // 단종 여부
        releasedDate: '2021-09-13',
        colors: ['스페이스 그레이', '실버'],
        specs: {
          year: '2021',
          cpu: 'A13 Bionic',
          gen: 9,
        },
        options: [
          {
            id: 5,
            connectivity: 'wifi',
            ssd: '64GB',
            price: 499000,
          },
          {
            id: 6,
            connectivity: 'wifi',
            ssd: '256GB',
            price: 739000,
          },
          {
            id: 7,
            connectivity: 'cellular',
            ssd: '64GB',
            price: 699000,
          },
          {
            id: 8,
            connectivity: 'cellular',
            ssd: '256GB',
            price: 939000,
          },
        ],
      },
      {
        title: 'iPad',
        alias: 'iPad',
        imgSrc: '/static/images/ipads/ipad-2022.jpeg',
        href: '/prices/ipad/ipad?optionId=9',
        isDeprecated: false, // 단종 여부
        releasedDate: '2022-10-17',
        colors: ['스페이스 그레이', '실버'],
        specs: {
          year: '2022',
          cpu: 'A14 Bionic',
          gen: 10,
        },
        options: [
          {
            id: 9,
            connectivity: 'wifi',
            ssd: '64GB',
            price: 679000,
          },
          {
            id: 10,
            connectivity: 'wifi',
            ssd: '256GB',
            price: 919000,
          },
          {
            id: 11,
            connectivity: 'cellular',
            ssd: '64GB',
            price: 919000,
          },
          {
            id: 12,
            connectivity: 'cellular',
            ssd: '256GB',
            price: 1159000,
          },
        ],
      },
    ],
  },
  {
    id: '9',
    model: 'iPad Pro 11',
    releasedDateHistory: ['2022-10-17', '2021-04-19', '2020-03-17', '2018-10-29'],
    desc: 'M2를 탑재한 iPad Pro 11은 ProMotion 기술이 적용된 Liquid Retina 디스플레이, 페이스 ID, 2세대 Apple Pencil을 지원합니다. 현존하는 태블릿 중 끝판왕 태블릿으로 필요하신 분은 당장 구매하세요.',
    href: '/prices/ipad/ipad-pro-11?optionId=17',
    price: 1249000, // 가장 최신 제품의 기본형의 가격
    imgSrc: '/static/images/ipads/ipad-pro-11-2022.png', // 대표 이미지
    data: [
      {
        title: 'iPad Pro 11',
        alias: 'iPad Pro 11',
        imgSrc: '/static/images/ipads/ipad-pro-11-2020.jpeg',
        href: '/prices/ipad/ipad-pro-11?optionId=1',
        isDeprecated: true, // 단종 여부
        releasedDate: '2020-03-17',
        colors: ['스페이스 그레이', '실버'],
        specs: {
          year: '2020',
          cpu: 'A12Z Bionic',
          gen: 2,
        },
        options: [
          {
            id: 1,
            connectivity: 'wifi',
            ssd: '128GB',
          },
          {
            id: 2,
            connectivity: 'wifi',
            ssd: '256GB',
          },
          {
            id: 3,
            connectivity: 'wifi',
            ssd: '512GB',
          },
          {
            id: 4,
            connectivity: 'wifi',
            ssd: '1TB',
          },
          {
            id: 5,
            connectivity: 'cellular',
            ssd: '128GB',
          },
          {
            id: 6,
            connectivity: 'cellular',
            ssd: '256GB',
          },
          {
            id: 7,
            connectivity: 'cellular',
            ssd: '512GB',
          },
          {
            id: 8,
            connectivity: 'cellular',
            ssd: '1TB',
          },
        ],
      },
      {
        title: 'iPad Pro 11',
        alias: 'iPad Pro 11',
        imgSrc: '/static/images/ipads/ipad-pro-11-2021.jpeg',
        href: '/prices/ipad/ipad-pro-11?optionId=9',
        isDeprecated: true, // 단종 여부
        releasedDate: '2021-04-19',
        colors: ['스페이스 그레이', '실버'],
        specs: {
          year: '2021',
          cpu: 'M1',
          gen: 3,
        },
        options: [
          {
            id: 9,
            connectivity: 'wifi',
            ssd: '128GB',
          },
          {
            id: 10,
            connectivity: 'wifi',
            ssd: '256GB',
          },
          {
            id: 11,
            connectivity: 'wifi',
            ssd: '512GB',
          },
          {
            id: 12,
            connectivity: 'wifi',
            ssd: '1TB',
          },
          {
            id: 13,
            connectivity: 'cellular',
            ssd: '128GB',
          },
          {
            id: 14,
            connectivity: 'cellular',
            ssd: '256GB',
          },
          {
            id: 15,
            connectivity: 'cellular',
            ssd: '512GB',
          },
          {
            id: 16,
            connectivity: 'cellular',
            ssd: '1TB',
          },
        ],
      },
      {
        title: 'iPad Pro 11',
        alias: 'iPad Pro 11',
        imgSrc: '/static/images/ipads/ipad-pro-11-2022.png',
        href: '/prices/ipad/ipad-pro-11?optionId=17',
        isDeprecated: false, // 단종 여부
        releasedDate: '2022-10-17',
        colors: ['스페이스 그레이', '실버'],
        specs: {
          year: '2022',
          cpu: 'M2',
          gen: 4,
        },
        options: [
          {
            id: 17,
            connectivity: 'wifi',
            ssd: '128GB',
            price: 1249000,
          },
          {
            id: 18,
            connectivity: 'wifi',
            ssd: '256GB',
            price: 1399000,
          },
          {
            id: 19,
            connectivity: 'wifi',
            ssd: '512GB',
            price: 1699000,
          },
          {
            id: 20,
            connectivity: 'wifi',
            ssd: '1TB',
            price: 2299000,
          },
          {
            id: 21,
            connectivity: 'cellular',
            ssd: '128GB',
            price: 1489000,
          },
          {
            id: 22,
            connectivity: 'cellular',
            ssd: '256GB',
            price: 1639000,
          },
          {
            id: 23,
            connectivity: 'cellular',
            ssd: '512GB',
            price: 1939000,
          },
          {
            id: 24,
            connectivity: 'cellular',
            ssd: '1TB',
            price: 2539000,
          },
        ],
      },
    ],
  },
  {
    id: '10',
    model: 'iPad Pro 12.9',
    releasedDateHistory: ['2022-10-17', '2021-04-19', '2020-03-17', '2018-10-29', '2017-06-04'],
    desc: 'M2를 탑재한 iPad Pro 12.9는 ProMotion 기술이 적용된 광활한 Liquid Retina 디스플레이, 페이스 ID, 2세대 Apple Pencil을 지원합니다. 현존하는 태블릿 중 끝판왕 태블릿으로 필요하신 분은 당장 구매하세요.',
    href: '/prices/ipad/ipad-pro-12-9?optionId=17',
    price: 1729000, // 가장 최신 제품의 기본형의 가격
    imgSrc: '/static/images/ipads/ipad-pro-12-9-2022.jpg', // 대표 이미지
    data: [
      {
        title: 'iPad Pro 12.9',
        alias: 'iPad Pro 12.9',
        imgSrc: '/static/images/ipads/ipad-pro-12-9-2022.jpg',
        href: '/prices/ipad/ipad-pro-12-9?optionId=1',
        isDeprecated: true, // 단종 여부
        releasedDate: '2020-03-17',
        colors: ['스페이스 그레이', '실버'],
        specs: {
          year: '2020',
          cpu: 'A12Z Bionic',
          gen: 4,
        },
        options: [
          {
            id: 1,
            connectivity: 'wifi',
            ssd: '128GB',
          },
          {
            id: 2,
            connectivity: 'wifi',
            ssd: '256GB',
          },
          {
            id: 3,
            connectivity: 'wifi',
            ssd: '512GB',
          },
          {
            id: 4,
            connectivity: 'wifi',
            ssd: '1TB',
          },
          {
            id: 5,
            connectivity: 'cellular',
            ssd: '128GB',
          },
          {
            id: 6,
            connectivity: 'cellular',
            ssd: '256GB',
          },
          {
            id: 7,
            connectivity: 'cellular',
            ssd: '512GB',
          },
          {
            id: 8,
            connectivity: 'cellular',
            ssd: '1TB',
          },
        ],
      },
      {
        title: 'iPad Pro 12.9',
        alias: 'iPad Pro 12.9',
        imgSrc: '/static/images/ipads/ipad-pro-12-9-2021.jpeg',
        href: '/prices/ipad/ipad-pro-12-9?optionId=9',
        isDeprecated: true, // 단종 여부
        releasedDate: '2021-04-19',
        colors: ['스페이스 그레이', '실버'],
        specs: {
          year: '2021',
          cpu: 'M1',
          gen: 5,
        },
        options: [
          {
            id: 9,
            connectivity: 'wifi',
            ssd: '128GB',
          },
          {
            id: 10,
            connectivity: 'wifi',
            ssd: '256GB',
          },
          {
            id: 11,
            connectivity: 'wifi',
            ssd: '512GB',
          },
          {
            id: 12,
            connectivity: 'wifi',
            ssd: '1TB',
          },
          {
            id: 13,
            connectivity: 'cellular',
            ssd: '128GB',
          },
          {
            id: 14,
            connectivity: 'cellular',
            ssd: '256GB',
          },
          {
            id: 15,
            connectivity: 'cellular',
            ssd: '512GB',
          },
          {
            id: 16,
            connectivity: 'cellular',
            ssd: '1TB',
          },
        ],
      },
      {
        title: 'iPad Pro 12.9',
        alias: 'iPad Pro 12.9',
        imgSrc: '/static/images/ipads/ipad-pro-12-9-2022.jpg',
        href: '/prices/ipad/ipad-pro-12-9?optionId=17',
        isDeprecated: false, // 단종 여부
        releasedDate: '2022-10-17',
        colors: ['스페이스 그레이', '실버'],
        specs: {
          year: '2022',
          cpu: 'M2',
          gen: 4,
        },
        options: [
          {
            id: 17,
            connectivity: 'wifi',
            ssd: '128GB',
            price: 1729000,
          },
          {
            id: 18,
            connectivity: 'wifi',
            ssd: '256GB',
            price: 1879000,
          },
          {
            id: 19,
            connectivity: 'wifi',
            ssd: '512GB',
            price: 2179000,
          },
          {
            id: 20,
            connectivity: 'wifi',
            ssd: '1TB',
            price: 2779000,
          },
          {
            id: 21,
            connectivity: 'cellular',
            ssd: '128GB',
            price: 1969000,
          },
          {
            id: 22,
            connectivity: 'cellular',
            ssd: '256GB',
            price: 2119000,
          },
          {
            id: 23,
            connectivity: 'cellular',
            ssd: '512GB',
            price: 2419000,
          },
          {
            id: 24,
            connectivity: 'cellular',
            ssd: '1TB',
            price: 3004000,
          },
        ],
      },
    ],
  },
]

export default optionsIpad
