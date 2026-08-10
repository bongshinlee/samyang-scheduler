// Smart Scheduler Initial Seed Data
const INITIAL_DATA = [
  {
    "id": 1,
    "part": "보전",
    "category": "기계",
    "taskName": "S2 CO Plate 열교환기 세정 공사",
    "manager": "이진규",
    "contractor": "디에이치피이엔지",
    "period": "8/13(목)",
    "schedules": {
      "8/10": {
        "text": "",
        "completed": true
      },
      "8/11": {
        "text": "",
        "completed": true
      },
      "8/12": {
        "text": "",
        "completed": true
      },
      "8/13": {
        "text": "Plate 열교환기 세정 및 취외/취부\n(대상: 2E-213, 215-1, 217, 219)",
        "completed": true
      },
      "8/14": {
        "text": "",
        "completed": true
      },
      "8/15": {
        "text": "",
        "completed": true
      },
      "8/16": {
        "text": "",
        "completed": true
      }
    },
    "completed": true
  },
  {
    "id": 2,
    "part": "보전",
    "category": "기계",
    "taskName": "현장 배관 보수(단가계약)",
    "manager": "이진규",
    "contractor": "동문이엔지",
    "period": "8/11(화)~8/15(토)",
    "schedules": {
      "8/10": {
        "text": "",
        "completed": false
      },
      "8/11": {
        "text": "보전미처리 및 정지시 작업 가능 배관 보수 진행 (1/5)",
        "completed": false
      },
      "8/12": {
        "text": "보전미처리 및 정지시 작업 가능 배관 보수 진행 (2/5)",
        "completed": false
      },
      "8/13": {
        "text": "보전미처리 및 정지시 작업 가능 배관 보수 진행 (3/5)",
        "completed": false
      },
      "8/14": {
        "text": "보전미처리 및 정지시 작업 가능 배관 보수 진행 (4/5)",
        "completed": false
      },
      "8/15": {
        "text": "보전미처리 및 정지시 작업 가능 배관 보수 진행 (5/5)",
        "completed": false
      },
      "8/16": {
        "text": "",
        "completed": false
      }
    },
    "completed": false
  },
  {
    "id": 3,
    "part": "보전",
    "category": "기계",
    "taskName": "2K-521 다공판 청소(단가계약)",
    "manager": "이진규",
    "contractor": "보성산업",
    "period": "8/13(목)",
    "schedules": {
      "8/10": {
        "text": "",
        "completed": false
      },
      "8/11": {
        "text": "",
        "completed": false
      },
      "8/12": {
        "text": "",
        "completed": false
      },
      "8/13": {
        "text": "2K-521 다공판 청소(입조)",
        "completed": false,
        "isUrgent": true
      },
      "8/14": {
        "text": "",
        "completed": false
      },
      "8/15": {
        "text": "",
        "completed": false
      },
      "8/16": {
        "text": "",
        "completed": false
      }
    },
    "completed": false
  },
  {
    "id": 4,
    "part": "보전",
    "category": "기계",
    "taskName": "작업자 휴게실 천막 및 차양막 설치",
    "manager": "이진규",
    "contractor": "보성산업",
    "period": "8/10(월)",
    "schedules": {
      "8/10": {
        "text": "작업자 휴게실 천막 및 차양막 설치(중장비)",
        "completed": true,
        "isUrgent": true
      },
      "8/11": {
        "text": "",
        "completed": false
      },
      "8/12": {
        "text": "",
        "completed": false
      },
      "8/13": {
        "text": "",
        "completed": false
      },
      "8/14": {
        "text": "",
        "completed": false
      },
      "8/15": {
        "text": "",
        "completed": false
      },
      "8/16": {
        "text": "",
        "completed": false
      }
    },
    "completed": true
  },
  {
    "id": 5,
    "part": "보전",
    "category": "기계",
    "taskName": "현장 보온 보수(단가계약)",
    "manager": "이진규",
    "contractor": "호반함석",
    "period": "8/12(수)~8/16(일)",
    "schedules": {
      "8/10": {
        "text": "",
        "completed": false
      },
      "8/11": {
        "text": "",
        "completed": false,
        "isInfo": true
      },
      "8/12": {
        "text": "S2 CO 열증체개소 보온해체 및 비계작업\n(폭염 및 필요성으로 진행여부 검토중)",
        "completed": false,
        "isInfo": true
      },
      "8/13": {
        "text": "S2 CO 열증체개소 보온해체 및 비계작업\n(폭염 및 필요성으로 진행여부 검토중)",
        "completed": false,
        "isInfo": true
      },
      "8/14": {
        "text": "",
        "completed": false
      },
      "8/15": {
        "text": "T-250 보냉복구",
        "completed": false
      },
      "8/16": {
        "text": "S2 CO 열증체개소 보온\n(폭염 및 필요성으로 진행여부 검토중)",
        "completed": false,
        "isInfo": true
      }
    },
    "completed": false
  },
  {
    "id": 6,
    "part": "보전",
    "category": "기계",
    "taskName": "고압가스 압력용기(T-250) Leak부 수리",
    "manager": "양우빈",
    "contractor": "용호기계기술",
    "period": "8/13(목)~8/14(금)",
    "schedules": {
      "8/10": {
        "text": "",
        "completed": false
      },
      "8/11": {
        "text": "",
        "completed": false
      },
      "8/12": {
        "text": "",
        "completed": false
      },
      "8/13": {
        "text": "Tank Leak부 수리",
        "completed": false
      },
      "8/14": {
        "text": "보수 마무리 및 비파괴검사\n가압Test - KGS입회(오후)",
        "completed": false
      },
      "8/15": {
        "text": "",
        "completed": false
      },
      "8/16": {
        "text": "",
        "completed": false
      }
    },
    "completed": false,
    "highlight": true
  },
  {
    "id": 7,
    "part": "보전",
    "category": "기계",
    "taskName": "S1 TW 매립배관 절단을 위한 굴착 및 복구",
    "manager": "양우빈",
    "contractor": "보문종합건설",
    "period": "8/10(월)~8/12(수)",
    "schedules": {
      "8/10": {
        "text": "S1 TW 배관부 굴착(중장비)",
        "completed": true
      },
      "8/11": {
        "text": "S1 TW 배관 절단 및 막음처리, Leak Check",
        "completed": false
      },
      "8/12": {
        "text": "굴착부 복구(중장비)",
        "completed": false
      },
      "8/13": {
        "text": "",
        "completed": false
      },
      "8/14": {
        "text": "",
        "completed": false
      },
      "8/15": {
        "text": "",
        "completed": false
      },
      "8/16": {
        "text": "",
        "completed": false
      }
    },
    "completed": false,
    "highlight": false
  },
  {
    "id": 8,
    "part": "보전",
    "category": "기계",
    "taskName": "S1,2 PCM Flushing조(1,2S-510) 이설",
    "manager": "양우빈",
    "contractor": "청마산업(&동문이엔지)",
    "period": "8/11(화)~8/14(금)",
    "schedules": {
      "8/10": {
        "text": "",
        "completed": false
      },
      "8/11": {
        "text": "2S-510 취외 및 S-510 설치를 위한 간섭 배관 철거",
        "completed": false
      },
      "8/12": {
        "text": "2S-510 ↔ S-510 교체 설치(중장비)",
        "completed": false,
        "isUrgent": true
      },
      "8/13": {
        "text": "2S-510 배관 연결",
        "completed": false
      },
      "8/14": {
        "text": "2S-510 배관 연결 & 수압 Test\n(청마산업 입회)",
        "completed": false
      },
      "8/15": {
        "text": "",
        "completed": false
      },
      "8/16": {
        "text": "",
        "completed": false
      }
    },
    "completed": false,
    "highlight": true
  },
  {
    "id": 9,
    "part": "보전",
    "category": "기계",
    "taskName": "S2 산세정 교반조의 Glass Lined Shaft 교체(투자)",
    "manager": "양우빈",
    "contractor": "동문이엔지",
    "period": "8/12(수)~8/14(금)",
    "schedules": {
      "8/10": {
        "text": "",
        "completed": false
      },
      "8/11": {
        "text": "Motor 해선 및 상판 취외를 위한 배관 철거",
        "completed": false
      },
      "8/12": {
        "text": "",
        "completed": false
      },
      "8/13": {
        "text": "2N-404-1 상판 취외 및 Shaft 교체, 상판 취부(중장비, 입조)",
        "completed": false
      },
      "8/14": {
        "text": "2N-404-1 배관 연결",
        "completed": false
      },
      "8/15": {
        "text": "",
        "completed": false
      },
      "8/16": {
        "text": "",
        "completed": false
      }
    },
    "completed": false,
    "highlight": true
  },
  {
    "id": 10,
    "part": "보전",
    "category": "기계",
    "taskName": "2C-231, 241 변판교체(자체작업)",
    "manager": "박병옥",
    "contractor": "강우기업(상주 도급업체)",
    "period": "8/13(목)~8/14(금)",
    "schedules": {
      "8/10": {
        "text": "",
        "completed": false
      },
      "8/11": {
        "text": "",
        "completed": false
      },
      "8/12": {
        "text": "",
        "completed": false
      },
      "8/13": {
        "text": "변판교체",
        "completed": false
      },
      "8/14": {
        "text": "변판교체",
        "completed": false
      },
      "8/15": {
        "text": "",
        "completed": false
      },
      "8/16": {
        "text": "",
        "completed": false
      }
    },
    "completed": false
  },
  {
    "id": 11,
    "part": "보전",
    "category": "기계",
    "taskName": "CDC 펌프(2P-261) 교체(자체작업)",
    "manager": "박병옥",
    "contractor": "강우기업(상주 도급업체)",
    "period": "8/14(금)",
    "schedules": {
      "8/10": {
        "text": "",
        "completed": false
      },
      "8/11": {
        "text": "",
        "completed": false
      },
      "8/12": {
        "text": "",
        "completed": false
      },
      "8/13": {
        "text": "",
        "completed": false
      },
      "8/14": {
        "text": "2P-261 Pump 교체\n(현장상황 및 일정에 따라 변동가능)",
        "completed": false
      },
      "8/15": {
        "text": "",
        "completed": false
      },
      "8/16": {
        "text": "",
        "completed": false
      }
    },
    "completed": false,
    "highlight": true
  },
  {
    "id": 12,
    "part": "보전",
    "category": "기계",
    "taskName": "2C-212 Coupling 점검(자체작업)",
    "manager": "박병옥",
    "contractor": "강우기업(상주 도급업체)",
    "period": "8/11(화)",
    "schedules": {
      "8/10": {
        "text": "",
        "completed": false
      },
      "8/11": {
        "text": "Coupling 점검 및 필요시 교체",
        "completed": false
      },
      "8/12": {
        "text": "",
        "completed": false
      },
      "8/13": {
        "text": "",
        "completed": false
      },
      "8/14": {
        "text": "",
        "completed": false
      },
      "8/15": {
        "text": "",
        "completed": false
      },
      "8/16": {
        "text": "",
        "completed": false
      }
    },
    "completed": false
  },
  {
    "id": 13,
    "part": "보전",
    "category": "기계",
    "taskName": "2S-521-1,2 Screen 교체(자체작업)",
    "manager": "박병옥",
    "contractor": "강우기업(상주 도급업체)",
    "period": "8/11(화)",
    "schedules": {
      "8/10": {
        "text": "",
        "completed": false
      },
      "8/11": {
        "text": "스크린 점검 및 필요시 교체",
        "completed": false
      },
      "8/12": {
        "text": "",
        "completed": false
      },
      "8/13": {
        "text": "",
        "completed": false
      },
      "8/14": {
        "text": "",
        "completed": false
      },
      "8/15": {
        "text": "",
        "completed": false
      },
      "8/16": {
        "text": "",
        "completed": false
      }
    },
    "completed": false
  },
  {
    "id": 14,
    "part": "보전",
    "category": "계장",
    "taskName": "계기교체 및 Calibration 작업",
    "manager": "고강석",
    "contractor": "가야엔지니어링",
    "period": "8/11(화)~8/14(금)",
    "schedules": {
      "8/10": {
        "text": "",
        "completed": false
      },
      "8/11": {
        "text": "S2 CO 계기/전송기 취외 점검",
        "completed": false
      },
      "8/12": {
        "text": "S2 CO 리포머 이그나이터 취외점검 및\n보일러 드럼레벨 S/W 교체",
        "completed": false
      },
      "8/13": {
        "text": "S2 CO 계기/전송기 교체 및 점검",
        "completed": false
      },
      "8/14": {
        "text": "2R-301 온도검출단 및 보호관 교체\nS2 주스팀, 용수, 보일러 계기 교체",
        "completed": false
      },
      "8/15": {
        "text": "",
        "completed": false
      },
      "8/16": {
        "text": "",
        "completed": false
      }
    },
    "completed": false
  },
  {
    "id": 15,
    "part": "보전",
    "category": "계장",
    "taskName": "S-510 → 2S-510 이설관련 계장품, EHT 이설공사",
    "manager": "고강석",
    "contractor": "경방이엔씨",
    "period": "8/10(월)~8/14(금)",
    "schedules": {
      "8/10": {
        "text": "1,2S-510 계장품/EHT 철거",
        "completed": true
      },
      "8/11": {
        "text": "2S-510 계장품 철거",
        "completed": false
      },
      "8/12": {
        "text": "",
        "completed": false
      },
      "8/13": {
        "text": "2S-510 계장품/EHT 취부 (1/2)",
        "completed": false
      },
      "8/14": {
        "text": "2S-510 계장품/EHT 취부 (2/2)",
        "completed": false
      },
      "8/15": {
        "text": "",
        "completed": false
      },
      "8/16": {
        "text": "",
        "completed": false
      }
    },
    "completed": false
  },
  {
    "id": 16,
    "part": "보전",
    "category": "계장",
    "taskName": "계장 밸브 정비/취외/점검(단가계약)",
    "manager": "고강석",
    "contractor": "오케이컨트롤",
    "period": "8/11(화)~8/14(금)",
    "schedules": {
      "8/10": {
        "text": "",
        "completed": false
      },
      "8/11": {
        "text": "S2 CO I/L용 전자변 20EA 교체",
        "completed": false
      },
      "8/12": {
        "text": "S2 주기대/CO C/V 점검 및 교체(5대)",
        "completed": false
      },
      "8/13": {
        "text": "2D-703 SOV 실린더 수리(4대) 및전자밸브 전체(12ea) 교체",
        "completed": false
      },
      "8/14": {
        "text": "",
        "completed": false
      },
      "8/15": {
        "text": "",
        "completed": false
      },
      "8/16": {
        "text": "",
        "completed": false
      }
    },
    "completed": false,
    "highlight": false
  }
];

if (typeof window !== 'undefined') {
  window.INITIAL_DATA = INITIAL_DATA;
}
