import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io';
import * as Io5Icons from 'react-icons/io5';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import * as TiIcons from 'react-icons/ti';
import * as TbIcons from 'react-icons/tb';
import * as CgIcons from 'react-icons/cg';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import * as VscIcons from 'react-icons/vsc';
import * as GrIcons from 'react-icons/gr';
import * as HiIcons from 'react-icons/hi';
import * as Hi2Icons from 'react-icons/hi2';
import * as ImIcons from 'react-icons/im';
import * as SlIcons from 'react-icons/sl';
import * as WiIcons from 'react-icons/wi';

const iconPacks: Record<string, any> = {
  fa: FaIcons,
  md: MdIcons,
  bi: BiIcons,
  bs: BsIcons,
  gi: GiIcons,
  io: IoIcons,
  io5: Io5Icons,
  ri: RiIcons,
  si: SiIcons,
  ti: TiIcons,
  tb: TbIcons,
  cg: CgIcons,
  fi: FiIcons,
  ai: AiIcons,
  vsc: VscIcons,
  gr: GrIcons,
  hi: HiIcons,
  hi2: Hi2Icons,
  im: ImIcons,
  sl: SlIcons,
  wi: WiIcons,
};

export function getIconByName(name: string) {
  // Find the correct pack by matching the prefix
  const packKey = Object.keys(iconPacks).find((key) => name.toLowerCase().startsWith(key));

  if (!packKey) return null;

  const pack = iconPacks[packKey];
  const IconComponent = pack[name];

  if (!IconComponent) return null;

  return <IconComponent />;
}
