import type { GameSquare } from '../types/game';

const generateBoard = (): GameSquare[] => {
  const squares_per_row = 10;
  
  const labels = [
    { label: 'START', type: 'START', desc: 'デロイト トーマツでの冒険が今、ここから始まる！' },
    { label: '新人研修', type: 'NORMAL', desc: 'コンサルタントとしての心構えを学ぶ。' },
    { label: '初給与', type: 'PAYDAY', desc: '最初のインパクト報酬を獲得！' },
    { label: '議事録作成', type: 'NORMAL', desc: '正確かつ迅速なアウトプットで信頼を築く。' },
    { label: '徹夜作業', type: 'TROUBLE', desc: '資料の完成度が裏目に... 体力とリソースを消耗。' },
    { label: 'リサーチ業務', type: 'NORMAL', desc: '誰も気づかないインサイトを発見。' },
    { label: 'C昇格', type: 'PROMOTION', desc: 'コンサルタントへ昇格！専門性が認められました。' },
    { label: 'PJ成功', type: 'PROJECT_SUCCESS', desc: 'プロジェクトが大成功！クライアントから感謝状。' },
    { label: 'ロジカルシンキング', type: 'TRAINING', desc: '思考の深さが一段階アップ！' },
    { label: '給料', type: 'PAYDAY', desc: '成果が報酬として反映される。' },
    { label: '炎上案件', type: 'TROUBLE', desc: 'トラブルの火消しに奔走。試練の時！' },
    { label: '顧客提案', type: 'NORMAL', desc: '革新的な提案でコンペを勝ち抜く。' },
    { label: 'DU研修', type: 'TRAINING', desc: 'Deloitte Universityでグローバルな視座を養う。' },
    { label: 'メンタリング', type: 'NORMAL', desc: '次世代を導くリーダーシップの発揮。' },
    { label: 'SC昇格', type: 'PROMOTION', desc: 'シニアコンサルタントへ！チームの要として活躍。' },
    { label: 'ボーナス', type: 'PAYDAY', desc: 'SCとしての卓越した貢献へのボーナス！' },
    { label: 'プレゼン成功', type: 'PROJECT_SUCCESS', desc: '経営層へのプレゼンで満場一致の承認！' },
    { label: '結婚', type: 'NORMAL', desc: 'プライベートでも大きな幸せが！' },
    { label: '仮説検証', type: 'NORMAL', desc: '緻密な検証で未来を確信に変える。' },
    { label: '分析ミス', type: 'TROUBLE', desc: 'データの誤認が発覚... 迅速なリカバリーが必要。' },
    { label: '大型PJ受注', type: 'PROJECT_SUCCESS', desc: '社会に巨大なインパクトを与える案件を受注！' },
    { label: 'Manager昇格', type: 'PROMOTION', desc: 'マネジャー就任！プロジェクトの全責任を担う。' },
    { label: '管理職研修', type: 'TRAINING', desc: 'ピープルマネジメントの神髄を体得。' },
    { label: '役職手当', type: 'PAYDAY', desc: 'マネジメントへの高い評価と責任の対価。' },
    { label: 'スコープ定義', type: 'NORMAL', desc: 'プロジェクトの勝利への地図を描く。' },
    { label: '要員不足', type: 'TROUBLE', desc: 'リソース不足を創意工夫で乗り切る！' },
    { label: 'グローバルPJ', type: 'PROJECT_SUCCESS', desc: '世界各国のDeloitteと連携し、国境を越えた価値を創出！' },
    { label: '採用面接', type: 'NORMAL', desc: '未来のDTCを背負う逸財を見出す。' },
    { label: '昇給', type: 'PAYDAY', desc: '市場価値の高まりが年収に直結。' },
    { label: 'ナレッジ共有', type: 'NORMAL', desc: '自身の知見が組織全体の力になる。' },
    { label: 'SM昇格', type: 'PROMOTION', desc: 'シニアマネジャーへ！卓越したリーダーとして君臨。' },
    { label: '予算削減', type: 'TROUBLE', desc: '逆境をバリューの最大化で跳ね返す！' },
    { label: '営業活動', type: 'NORMAL', desc: '新たな業界にDTCの風を吹き込む。' },
    { label: '特別報酬', type: 'PAYDAY', desc: '想像を超える業績への特別インセンティブ。' },
    { label: 'リーダー研修', type: 'TRAINING', desc: '次世代パートナーとしての覚悟を決める。' },
    { label: '大規模DX', type: 'PROJECT_SUCCESS', desc: '日本のデジタル社会の礎を築く成功。' },
    { label: '業界講演', type: 'NORMAL', desc: '思想的リーダーとして業界を牽引。' },
    { label: 'コンプラ問題', type: 'TROUBLE', desc: '最高の誠実さで危機を解決に導く。' },
    { label: '経営会議', type: 'NORMAL', desc: 'DTCの屋台骨を支える重要な意思決定。' },
    { label: 'Partner昇格', type: 'PROMOTION', desc: 'パートナー就任！DTCの共同経営者として歴史に名を刻む。' },
    { label: '配当金', type: 'PAYDAY', desc: 'パートナーとして、ビジネスの果実を享受。' },
    { label: '全社戦略策定', type: 'NORMAL', desc: 'DTCの次の10年を創る青写真。' },
    { label: 'サクセッション', type: 'NORMAL', desc: '次世代のリーダーたちにバトンを繋ぐ。' },
    { label: '市場縮小', type: 'TROUBLE', desc: '守りから攻めへの転換で危機の打開！' },
    { label: 'ブランディング', type: 'NORMAL', desc: 'DTCのブランドを、唯一無二の存在へ。' },
    { label: '役員給与', type: 'PAYDAY', desc: 'トップエグゼクティブとしての最高峰の報酬。' },
    { label: 'M&Aアドバイザリー', type: 'PROJECT_SUCCESS', desc: '業界再編を成功させ、新たな価値を生む。' },
    { label: 'ESG評価', type: 'NORMAL', desc: '社会全体の幸福と利益を両立させる。' },
    { label: '常務執行役員', type: 'PROMOTION', desc: '組織をさらなる高みへと引き上げる。' },
    { label: '炎上対応', type: 'TROUBLE', desc: 'リーダーとしての胆力で最悪の事態を脱出。' },
    { label: 'メディア取材', type: 'NORMAL', desc: 'あなたの言葉が社会の羅針盤となる。' },
    { label: '特別賞与', type: 'PAYDAY', desc: '人々の想像を超え、社会を変えた証。' },
    { label: 'エグゼクティブ研修', type: 'TRAINING', desc: '世界のトップリーダーが集う場で哲学を磨く。' },
    { label: '提携交渉', type: 'NORMAL', desc: '世紀の提携で、誰も見たことのない未来を拓く。' },
    { label: '国家級PJ', type: 'PROJECT_SUCCESS', desc: '歴史に残り、語り継がれる偉業を達成！' },
    { label: 'ガバナンス強化', type: 'NORMAL', desc: '強固な基盤が、持続的な成長を約束する。' },
    { label: 'イノベーション賞', type: 'NORMAL', desc: 'あなたの独創性が社会の常識を変えた。' },
    { label: '最終決算', type: 'PAYDAY', desc: '有終の美を飾る、過去最高の決算。' },
    { label: '体調不良', type: 'TROUBLE', desc: '究極のインパクトのための、束の間の休息。' },
    { label: 'DTC社長', type: 'GOAL', desc: 'おめでとうございます！Make an Impact that Mattersを象徴する、DTC最高責任者へ就任！' },
  ];

  const squares: GameSquare[] = labels.map((item, i) => {
    const row = Math.floor(i / squares_per_row);
    return {
      id: i,
      type: item.type as any,
      label: item.label,
      description: item.desc,
      row,
      col: i % squares_per_row,
      color: item.label === 'START' || item.label === 'DTC社長' ? '#86bc25' : undefined
    };
  });

  return squares;
};

export const BOARD_SQUARES = generateBoard();
export const SQUARES_PER_ROW = 10;
export const TOTAL_ROWS = 6;
