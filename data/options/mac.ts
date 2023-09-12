const optionsMac: MacModel[] = [
  {
    id: '1',
    model: 'Mac mini',
    releasedDateHistory: ['2023-01-17', '2020-11-10', '2018-10-30'],
    desc: 'M2와 M2 Pro 칩을 탑재한 Mac mini는 미니라고 부를 수 없을 정도로 좋은 성능과 착한 가격을 가지고 있습니다. 뛰어난 가성비를 자랑하는 만큼 맥에 입문하기에 최적의 제품입니다.',
    href: '/prices/mac/mac-mini?optionId=7',
    price: 850000, // 가장 최신 제품의 기본형의 가격
    imgSrc: '/static/images/macs/mac-mini.jpeg', // 대표 이미지
    data: [
      {
        title: 'Mac mini',
        alias: 'Mac mini',
        imgSrc: '/static/images/macs/mac-mini.jpeg',
        href: '/prices/mac/mac-mini?optionId=1',
        isDeprecated: true, // 단종 여부
        releasedDate: '2020-11-10',
        colors: ['실버'],
        specs: {
          year: '2020',
          cpuType: 'M1',
          cpu: 'M1 8코어',
          gpu: '8코어',
        },
        options: [
          {
            id: 1,
            ram: '8GB',
            ssd: '256GB',
          },
          {
            id: 2,
            ram: '8GB',
            ssd: '512GB',
          },
          {
            id: 3,
            ram: '8GB',
            ssd: '1TB',
          },
          {
            id: 4,
            ram: '16GB',
            ssd: '256GB',
          },
          {
            id: 5,
            ram: '16GB',
            ssd: '512GB',
          },
          {
            id: 6,
            ram: '16GB',
            ssd: '1TB',
          },
        ],
      },
      {
        title: 'Mac mini',
        alias: 'Mac mini',
        imgSrc: '/static/images/macs/mac-mini.jpeg',
        href: '/prices/mac/mac-mini?optionId=7',
        isDeprecated: false, // 단종 여부
        releasedDate: '2023-01-17',
        colors: ['실버'],
        specs: {
          year: '2023',
          cpuType: 'M2',
          cpu: 'M2 8코어',
          gpu: '10코어',
        },
        options: [
          {
            id: 7,
            ram: '8GB',
            ssd: '256GB',
            price: 850000,
          },
          {
            id: 8,
            ram: '8GB',
            ssd: '512GB',
            price: 1120000,
          },
          {
            id: 9,
            ram: '8GB',
            ssd: '1TB',
            price: 1390000,
          },
          {
            id: 10,
            ram: '16GB',
            ssd: '256GB',
            price: 1120000,
          },
          {
            id: 11,
            ram: '16GB',
            ssd: '512GB',
            price: 1390000,
          },
          {
            id: 12,
            ram: '16GB',
            ssd: '1TB',
            price: 1660000,
          },
        ],
      },
      {
        title: 'Mac mini',
        alias: 'Mac mini',
        imgSrc: '/static/images/macs/mac-mini.jpeg',
        href: '/prices/mac/mac-mini?optionId=13',
        isDeprecated: false, // 단종 여부
        releasedDate: '2023-01-17',
        colors: ['실버'],
        specs: {
          year: '2023',
          cpuType: 'M2 Pro',
          cpu: 'M2 Pro 10코어',
          gpu: '16코어',
        },
        options: [
          {
            id: 13,
            ram: '16GB',
            ssd: '512GB',
            price: 1790000,
          },
          {
            id: 14,
            ram: '16GB',
            ssd: '1TB',
            price: 2060000,
          },
          {
            id: 15,
            ram: '32GB',
            ssd: '512GB',
            price: 2330000,
          },
          {
            id: 16,
            ram: '32GB',
            ssd: '1TB',
            price: 2600000,
          },
        ],
      },
      {
        title: 'Mac mini',
        alias: 'Mac mini',
        imgSrc: '/static/images/macs/mac-mini.jpeg',
        href: '/prices/mac/mac-mini?optionId=17',
        isDeprecated: false, // 단종 여부
        releasedDate: '2023-01-17',
        colors: ['실버'],
        specs: {
          year: '2023',
          cpuType: 'M2 Pro',
          cpu: 'M2 Pro 12코어',
          gpu: '19코어',
        },
        options: [
          {
            id: 17,
            ram: '16GB',
            ssd: '512GB',
            price: 2195000,
          },
          {
            id: 18,
            ram: '16GB',
            ssd: '1TB',
            price: 2465000,
          },
          {
            id: 19,
            ram: '32GB',
            ssd: '512GB',
            price: 2735000,
          },
          {
            id: 20,
            ram: '32GB',
            ssd: '1TB',
            price: 3005000,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    model: 'MacBook Air 13',
    desc: '완전히 리뉴얼된 MacBook Air는 가벼움은 유지하면서 더욱 선명한 Liquid Retina 디스플레이를 탑재하였습니다. MagSafe를 지원하여 조금 더 여유로워진 포트 구성을 가지고 있습니다.',
    href: '/prices/mac/macbook-air-13?optionId=13',
    price: 1590000, // 가장 최신 제품의 기본형의 가격
    imgSrc: '/static/images/macs/macbook-air-13-2022.jpeg', // 대표 이미지
    releasedDateHistory: [
      '2022-06-06',
      '2020-11-10',
      '2020-03-18',
      '2020-03-18',
      '2019-07-09',
      '2018-10-30',
      '2017-06-05',
      '2015-03-09',
    ],
    data: [
      {
        title: 'MacBook Air 13',
        alias: 'MacBook Air 13',
        imgSrc: '/static/images/macs/macbook-air-13-2020.jpeg',
        href: '/prices/mac/macbook-air-13?optionId=1',
        isDeprecated: false, // 단종 여부
        releasedDate: '2020-11-10',
        colors: ['실버', '스페이스 그레이', '골드'],
        specs: {
          year: '2020',
          cpuType: 'M1',
          cpu: 'M1 8코어',
          gpu: '7코어',
        },
        options: [
          {
            id: 1,
            ram: '8GB',
            ssd: '256GB',
            price: 1390000,
          },
          {
            id: 2,
            ram: '8GB',
            ssd: '512GB',
            price: 1660000,
          },
          {
            id: 3,
            ram: '8GB',
            ssd: '1TB',
            price: 1930000,
          },
          {
            id: 4,
            ram: '16GB',
            ssd: '256GB',
            price: 1660000,
          },
          {
            id: 5,
            ram: '16GB',
            ssd: '512GB',
            price: 1930000,
          },
          {
            id: 6,
            ram: '16GB',
            ssd: '1TB',
            price: 2200000,
          },
        ],
      },
      {
        title: 'MacBook Air 13',
        alias: 'MacBook Air 13',
        imgSrc: '/static/images/macs/macbook-air-13-2020.jpeg',
        href: '/prices/mac/macbook-air-13?optionId=7',
        isDeprecated: true, // 단종 여부
        releasedDate: '2020-11-10',
        colors: ['실버', '스페이스 그레이', '골드'],
        specs: {
          year: '2020',
          cpuType: 'M1',
          cpu: 'M1 8코어',
          gpu: '8코어',
        },
        options: [
          {
            id: 7,
            ram: '8GB',
            ssd: '256GB',
          },
          {
            id: 8,
            ram: '8GB',
            ssd: '512GB',
          },
          {
            id: 9,
            ram: '8GB',
            ssd: '1TB',
          },
          {
            id: 10,
            ram: '16GB',
            ssd: '256GB',
          },
          {
            id: 11,
            ram: '16GB',
            ssd: '512GB',
          },
          {
            id: 12,
            ram: '16GB',
            ssd: '1TB',
          },
        ],
      },
      {
        title: 'MacBook Air 13',
        alias: 'MacBook Air 13',
        imgSrc: '/static/images/macs/macbook-air-13-2022.jpeg',
        href: '/prices/mac/macbook-air-13?optionId=13',
        isDeprecated: false, // 단종 여부
        releasedDate: '2022-06-06',
        colors: ['미드나이트', '스타라이트', '스페이스 그레이', '실버'],
        specs: {
          year: '2022',
          cpuType: 'M2',
          cpu: 'M2 8코어',
          gpu: '8코어',
        },
        options: [
          {
            id: 13,
            ram: '8GB',
            ssd: '256GB',
            price: 1590000,
          },
          {
            id: 14,
            ram: '8GB',
            ssd: '512GB',
            price: 1860000,
          },
          {
            id: 15,
            ram: '8GB',
            ssd: '1TB',
            price: 2130000,
          },
          {
            id: 16,
            ram: '16GB',
            ssd: '256GB',
            price: 1860000,
          },
          {
            id: 17,
            ram: '16GB',
            ssd: '512GB',
            price: 2130000,
          },
          {
            id: 18,
            ram: '16GB',
            ssd: '1TB',
            price: 2400000,
          },
        ],
      },
      {
        title: 'MacBook Air 13',
        alias: 'MacBook Air 13',
        imgSrc: '/static/images/macs/macbook-air-13-2022.jpeg',
        href: '/prices/mac/macbook-air-13?optionId=19',
        isDeprecated: false, // 단종 여부
        releasedDate: '2022-06-06',
        colors: ['미드나이트', '스타라이트', '스페이스 그레이', '실버'],
        specs: {
          year: '2022',
          cpuType: 'M2',
          cpu: 'M2 8코어',
          gpu: '10코어',
        },
        options: [
          {
            id: 19,
            ram: '8GB',
            ssd: '256GB',
            price: 1720000,
          },
          {
            id: 20,
            ram: '8GB',
            ssd: '512GB',
            price: 1990000,
          },
          {
            id: 21,
            ram: '8GB',
            ssd: '1TB',
            price: 2260000,
          },
          {
            id: 22,
            ram: '16GB',
            ssd: '256GB',
            price: 1990000,
          },
          {
            id: 23,
            ram: '16GB',
            ssd: '512GB',
            price: 2260000,
          },
          {
            id: 24,
            ram: '16GB',
            ssd: '1TB',
            price: 2530000,
          },
        ],
      },
    ],
  },
  {
    id: '3',
    model: 'MacBook Pro 13',
    releasedDateHistory: ['2022-06-06', '2020-11-10', '2020-05-04', '2019-05-21', '2018-07-12'],
    desc: 'MacBook Pro 엔트리 라인으로 터치바가 남아있는 유일한 제품입니다. M2 칩을 탑재하여 성능은 뛰어나지만 몇 년동안 동일한 디자인을 가지고 있어 약간 아쉬운 제품입니다.',
    href: '/prices/mac/macbook-pro-13?optionId=7',
    price: 1790000, // 가장 최신 제품의 기본형의 가격
    imgSrc: '/static/images/macs/macbook-pro-13-2022.jpeg', // 대표 이미지
    data: [
      {
        title: 'MacBook Pro 13',
        alias: 'MacBook Pro 13',
        imgSrc: '/static/images/macs/macbook-pro-13-2020.jpeg',
        href: '/prices/mac/macbook-pro-13?optionId=1',
        isDeprecated: true, // 단종 여부
        releasedDate: '2020-11-10',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2020',
          cpuType: 'M1',
          cpu: 'M1 8코어',
          gpu: '8코어',
        },
        options: [
          {
            id: 1,
            ram: '8GB',
            ssd: '256GB',
          },
          {
            id: 2,
            ram: '8GB',
            ssd: '512GB',
          },
          {
            id: 3,
            ram: '8GB',
            ssd: '1TB',
          },
          {
            id: 4,
            ram: '16GB',
            ssd: '256GB',
          },
          {
            id: 5,
            ram: '16GB',
            ssd: '512GB',
          },
          {
            id: 6,
            ram: '16GB',
            ssd: '1TB',
          },
        ],
      },
      {
        title: 'MacBook Pro 13',
        alias: 'MacBook Pro 13',
        imgSrc: '/static/images/macs/macbook-pro-13-2022.jpeg',
        href: '/prices/mac/macbook-pro-13?optionId=7',
        isDeprecated: false, // 단종 여부
        releasedDate: '2022-06-06',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2022',
          cpuType: 'M2',
          cpu: 'M2 8코어',
          gpu: '10코어',
        },
        options: [
          {
            id: 7,
            ram: '8GB',
            ssd: '256GB',
            price: 1790000,
          },
          {
            id: 8,
            ram: '8GB',
            ssd: '512GB',
            price: 2060000,
          },
          {
            id: 9,
            ram: '8GB',
            ssd: '1TB',
            price: 2330000,
          },
          {
            id: 10,
            ram: '16GB',
            ssd: '256GB',
            price: 2060000,
          },
          {
            id: 11,
            ram: '16GB',
            ssd: '512GB',
            price: 2330000,
          },
          {
            id: 12,
            ram: '16GB',
            ssd: '1TB',
            price: 2600000,
          },
        ],
      },
    ],
  },
  {
    id: '4',
    model: 'MacBook Pro 14',
    releasedDateHistory: ['2023-01-17', '2021-10-18'],
    desc: 'M2 Pro와 M2 Max를 탑재한 14인치 MacBook Pro는 뛰어난 성능, 아름다운 디스플레이, 하루종일 가는 배터리, 넉넉한 포트구성 등 흠잡을 게 없는 제품입니다. 필요하다면 지금 구매하세요.',
    href: '/prices/mac/macbook-pro-14?optionId=21',
    price: 2790000, // 가장 최신 제품의 기본형의 가격
    imgSrc: '/static/images/macs/macbook-pro-14-2023.jpeg', // 대표 이미지
    data: [
      {
        title: 'MacBook Pro 14',
        alias: 'MacBook Pro 14',
        imgSrc: '/static/images/macs/macbook-pro-14-2021.jpeg',
        href: '/prices/mac/macbook-pro-14?optionId=1',
        isDeprecated: true, // 단종 여부
        releasedDate: '2021-10-18',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2021',
          cpuType: 'M1 Pro',
          cpu: 'M1 Pro 8코어',
          gpu: '14코어',
        },
        options: [
          {
            id: 1,
            ram: '16GB',
            ssd: '512GB',
          },
          {
            id: 2,
            ram: '16GB',
            ssd: '1TB',
          },
          {
            id: 3,
            ram: '32GB',
            ssd: '512GB',
          },
          {
            id: 4,
            ram: '32GB',
            ssd: '1TB',
          },
        ],
      },
      {
        title: 'MacBook Pro 14',
        alias: 'MacBook Pro 14',
        imgSrc: '/static/images/macs/macbook-pro-14-2021.jpeg',
        href: '/prices/mac/macbook-pro-14?optionId=5',
        isDeprecated: true, // 단종 여부
        releasedDate: '2021-10-18',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2021',
          cpuType: 'M1 Pro',
          cpu: 'M1 Pro 10코어',
          gpu: '14코어',
        },
        options: [
          {
            id: 5,
            ram: '16GB',
            ssd: '512GB',
          },
          {
            id: 6,
            ram: '16GB',
            ssd: '1TB',
          },
          {
            id: 7,
            ram: '32GB',
            ssd: '512GB',
          },
          {
            id: 8,
            ram: '32GB',
            ssd: '1TB',
          },
        ],
      },
      {
        title: 'MacBook Pro 14',
        alias: 'MacBook Pro 14',
        imgSrc: '/static/images/macs/macbook-pro-14-2021.jpeg',
        href: '/prices/mac/macbook-pro-14?optionId=9',
        isDeprecated: true, // 단종 여부
        releasedDate: '2021-10-18',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2021',
          cpuType: 'M1 Pro',
          cpu: 'M1 Pro 10코어',
          gpu: '16코어',
        },
        options: [
          {
            id: 9,
            ram: '16GB',
            ssd: '512GB',
          },
          {
            id: 10,
            ram: '16GB',
            ssd: '1TB',
          },
          {
            id: 11,
            ram: '32GB',
            ssd: '512GB',
          },
          {
            id: 12,
            ram: '32GB',
            ssd: '1TB',
          },
        ],
      },
      {
        title: 'MacBook Pro 14',
        alias: 'MacBook Pro 14',
        imgSrc: '/static/images/macs/macbook-pro-14-2021.jpeg',
        href: '/prices/mac/macbook-pro-14?optionId=13',
        isDeprecated: true, // 단종 여부
        releasedDate: '2021-10-18',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2021',
          cpuType: 'M1 Max',
          cpu: 'M1 Max 10코어',
          gpu: '24코어',
        },
        options: [
          {
            id: 13,
            ram: '16GB',
            ssd: '512GB',
          },
          {
            id: 14,
            ram: '16GB',
            ssd: '1TB',
          },
          {
            id: 15,
            ram: '32GB',
            ssd: '512GB',
          },
          {
            id: 16,
            ram: '32GB',
            ssd: '1TB',
          },
        ],
      },
      {
        title: 'MacBook Pro 14',
        alias: 'MacBook Pro 14',
        imgSrc: '/static/images/macs/macbook-pro-14-2021.jpeg',
        href: '/prices/mac/macbook-pro-14?optionId=17',
        isDeprecated: true, // 단종 여부
        releasedDate: '2021-10-18',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2021',
          cpuType: 'M1 Max',
          cpu: 'M1 Max 10코어',
          gpu: '32코어',
        },
        options: [
          {
            id: 17,
            ram: '32GB',
            ssd: '512GB',
          },
          {
            id: 18,
            ram: '32GB',
            ssd: '1TB',
          },
          {
            id: 19,
            ram: '32GB',
            ssd: '512GB',
          },
          {
            id: 20,
            ram: '32GB',
            ssd: '1TB',
          },
        ],
      },
      {
        title: 'MacBook Pro 14',
        alias: 'MacBook Pro 14',
        imgSrc: '/static/images/macs/macbook-pro-14-2023.jpeg',
        href: '/prices/mac/macbook-pro-14?optionId=21',
        isDeprecated: false, // 단종 여부
        releasedDate: '2023-01-17',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2023',
          cpuType: 'M2 Pro',
          cpu: 'M2 Pro 10코어',
          gpu: '16코어',
        },
        options: [
          {
            id: 21,
            ram: '16GB',
            ssd: '512GB',
            price: 2790000,
          },
          {
            id: 22,
            ram: '16GB',
            ssd: '1TB',
            price: 3060000,
          },
          {
            id: 23,
            ram: '32GB',
            ssd: '512GB',
            price: 3330000,
          },
          {
            id: 24,
            ram: '32GB',
            ssd: '1TB',
            price: 3600000,
          },
        ],
      },
      {
        title: 'MacBook Pro 14',
        alias: 'MacBook Pro 14',
        imgSrc: '/static/images/macs/macbook-pro-14-2023.jpeg',
        href: '/prices/mac/macbook-pro-14?optionId=25',
        isDeprecated: false, // 단종 여부
        releasedDate: '2023-01-17',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2023',
          cpuType: 'M2 Pro',
          cpu: 'M2 Pro 12코어',
          gpu: '19코어',
        },
        options: [
          {
            id: 25,
            ram: '16GB',
            ssd: '512GB',
            price: 3220000,
          },
          {
            id: 26,
            ram: '16GB',
            ssd: '1TB',
            price: 3490000,
          },
          {
            id: 27,
            ram: '32GB',
            ssd: '512GB',
            price: 3760000,
          },
          {
            id: 28,
            ram: '32GB',
            ssd: '1TB',
            price: 4030000,
          },
        ],
      },
      {
        title: 'MacBook Pro 14',
        alias: 'MacBook Pro 14',
        imgSrc: '/static/images/macs/macbook-pro-14-2023.jpeg',
        href: '/prices/mac/macbook-pro-14?optionId=29',
        isDeprecated: false, // 단종 여부
        releasedDate: '2023-01-17',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2023',
          cpuType: 'M2 Max',
          cpu: 'M2 Max 12코어',
          gpu: '30코어',
        },
        options: [
          {
            id: 29,
            ram: '32GB',
            ssd: '1TB',
            price: 4290000,
          },
          {
            id: 30,
            ram: '32GB',
            ssd: '2TB',
            price: 4830000,
          },
          {
            id: 31,
            ram: '64GB',
            ssd: '1TB',
            price: 4830000,
          },
          {
            id: 32,
            ram: '64GB',
            ssd: '2TB',
            price: 5370000,
          },
        ],
      },
      {
        title: 'MacBook Pro 14',
        alias: 'MacBook Pro 14',
        imgSrc: '/static/images/macs/macbook-pro-14-2023.jpeg',
        href: '/prices/mac/macbook-pro-14?optionId=33',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2023',
          cpuType: 'M2 Max',
          cpu: 'M2 Max 12코어',
          gpu: '38코어',
        },
        options: [
          {
            id: 33,
            ram: '32GB',
            ssd: '1TB',
            price: 4560000,
          },
          {
            id: 34,
            ram: '32GB',
            ssd: '2TB',
            price: 5100000,
          },
          {
            id: 35,
            ram: '64GB',
            ssd: '1TB',
            price: 5100000,
          },
          {
            id: 36,
            ram: '64GB',
            ssd: '2TB',
            price: 5640000,
          },
        ],
      },
    ],
  },
  {
    id: '5',
    model: 'MacBook Pro 16',
    releasedDateHistory: ['2023-01-17', '2021-10-18', '2019-11-13'],
    desc: 'M2 Pro와 M2 Max를 탑재한 16인치 MacBook Pro는 뛰어난 성능, 아름다운 광활한 디스플레이, 하루종일 가는 배터리, 넉넉한 포트구성 등 거의 완벽한 제품입니다. 유일한 단점은 무게입니다. 필요하다면 지금 구매하세요.',
    href: '/prices/mac/macbook-pro-16?optionId=13',
    price: 3490000, // 가장 최신 제품의 기본형의 가격
    imgSrc: '/static/images/macs/macbook-pro-16-2023.jpeg', // 대표 이미지
    data: [
      {
        title: 'MacBook Pro 16',
        alias: 'MacBook Pro 16',
        imgSrc: '/static/images/macs/macbook-pro-16-2021.jpeg',
        href: '/prices/mac/macbook-pro-16?optionId=1',
        isDeprecated: true, // 단종 여부
        releasedDate: '2021-10-18',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2021',
          cpuType: 'M1 Pro',
          cpu: 'M1 Pro 10코어',
          gpu: '16코어',
        },
        options: [
          {
            id: 1,
            ram: '16GB',
            ssd: '512GB',
          },
          {
            id: 2,
            ram: '16GB',
            ssd: '1TB',
          },
          {
            id: 3,
            ram: '32GB',
            ssd: '512GB',
          },
          {
            id: 4,
            ram: '32GB',
            ssd: '1TB',
          },
        ],
      },
      {
        title: 'MacBook Pro 16',
        alias: 'MacBook Pro 16',
        imgSrc: '/static/images/macs/macbook-pro-16-2021.jpeg',
        href: '/prices/mac/macbook-pro-16?optionId=5',
        isDeprecated: true, // 단종 여부
        releasedDate: '2021-10-18',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2021',
          cpuType: 'M1 Max',
          cpu: 'M1 Max 10코어',
          gpu: '24코어',
        },
        options: [
          {
            id: 5,
            ram: '32GB',
            ssd: '512GB',
          },
          {
            id: 6,
            ram: '32GB',
            ssd: '1TB',
          },
          {
            id: 7,
            ram: '64GB',
            ssd: '512GB',
          },
          {
            id: 8,
            ram: '64GB',
            ssd: '1TB',
          },
        ],
      },
      {
        title: 'MacBook Pro 16',
        alias: 'MacBook Pro 16',
        imgSrc: '/static/images/macs/macbook-pro-16-2021.jpeg',
        href: '/prices/mac/macbook-pro-16?optionId=9',
        isDeprecated: true, // 단종 여부
        releasedDate: '2021-10-18',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2021',
          cpuType: 'M1 Max',
          cpu: 'M1 Max 10코어',
          gpu: '32코어',
        },
        options: [
          {
            id: 9,
            ram: '32GB',
            ssd: '512GB',
          },
          {
            id: 10,
            ram: '32GB',
            ssd: '1TB',
          },
          {
            id: 11,
            ram: '64GB',
            ssd: '512GB',
          },
          {
            id: 12,
            ram: '64GB',
            ssd: '1TB',
          },
        ],
      },
      {
        title: 'MacBook Pro 16',
        alias: 'MacBook Pro 16',
        imgSrc: '/static/images/macs/macbook-pro-16-2023.jpeg',
        href: '/prices/mac/macbook-pro-16?optionId=13',
        isDeprecated: false, // 단종 여부
        releasedDate: '2023-01-17',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2023',
          cpuType: 'M2 Pro',
          cpu: 'M2 Pro 12코어',
          gpu: '19코어',
        },
        options: [
          {
            id: 13,
            ram: '16GB',
            ssd: '512GB',
            price: 3490000,
          },
          {
            id: 14,
            ram: '16GB',
            ssd: '1TB',
            price: 3760000,
          },
          {
            id: 15,
            ram: '32GB',
            ssd: '512GB',
            price: 4030000,
          },
          {
            id: 16,
            ram: '32GB',
            ssd: '1TB',
            price: 4300000,
          },
        ],
      },
      {
        title: 'MacBook Pro 16',
        alias: 'MacBook Pro 16',
        imgSrc: '/static/images/macs/macbook-pro-16-2023.jpeg',
        href: '/prices/mac/macbook-pro-16?optionId=17',
        isDeprecated: false, // 단종 여부
        releasedDate: '2023-01-17',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2023',
          cpuType: 'M2 Max',
          cpu: 'M2 Max 12코어',
          gpu: '30코어',
        },
        options: [
          {
            id: 17,
            ram: '32GB',
            ssd: '1TB',
            price: 4570000,
          },
          {
            id: 18,
            ram: '32GB',
            ssd: '2TB',
            price: 5110000,
          },
          {
            id: 19,
            ram: '64GB',
            ssd: '1TB',
            price: 5110000,
          },
          {
            id: 20,
            ram: '64GB',
            ssd: '2TB',
            price: 5650000,
          },
        ],
      },
      {
        title: 'MacBook Pro 16',
        alias: 'MacBook Pro 16',
        imgSrc: '/static/images/macs/macbook-pro-16-2023.jpeg',
        href: '/prices/mac/macbook-pro-16?optionId=21',
        isDeprecated: false, // 단종 여부
        releasedDate: '2023-01-17',
        colors: ['실버', '스페이스 그레이'],
        specs: {
          year: '2023',

          cpuType: 'M2 Max',
          cpu: 'M2 Max 12코어',

          gpu: '38코어',
        },
        options: [
          {
            id: 21,
            ram: '32GB',
            ssd: '1TB',
            price: 4840000,
          },
          {
            id: 22,
            ram: '32GB',
            ssd: '2TB',
            price: 5380000,
          },
          {
            id: 23,
            ram: '64GB',
            ssd: '1TB',
            price: 5380000,
          },
          {
            id: 24,
            ram: '64GB',
            ssd: '2TB',
            price: 5920000,
          },
        ],
      },
    ],
  },
]

export default optionsMac
