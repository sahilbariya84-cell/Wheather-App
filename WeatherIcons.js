import React from 'react';
import Svg, { Circle, Path, Line } from 'react-native-svg';

const SIZE = 68;

export function SunIcon() {
  return (
    <Svg width={SIZE} height={SIZE} viewBox="0 0 64 64" fill="none">
      <Circle cx="32" cy="32" r="14" fill="#FFC978" />
      <Line x1="32" y1="4" x2="32" y2="12" stroke="#FFC978" strokeWidth="3.2" strokeLinecap="round" />
      <Line x1="32" y1="52" x2="32" y2="60" stroke="#FFC978" strokeWidth="3.2" strokeLinecap="round" />
      <Line x1="4" y1="32" x2="12" y2="32" stroke="#FFC978" strokeWidth="3.2" strokeLinecap="round" />
      <Line x1="52" y1="32" x2="60" y2="32" stroke="#FFC978" strokeWidth="3.2" strokeLinecap="round" />
      <Line x1="11.5" y1="11.5" x2="17" y2="17" stroke="#FFC978" strokeWidth="3.2" strokeLinecap="round" />
      <Line x1="47" y1="47" x2="52.5" y2="52.5" stroke="#FFC978" strokeWidth="3.2" strokeLinecap="round" />
      <Line x1="11.5" y1="52.5" x2="17" y2="47" stroke="#FFC978" strokeWidth="3.2" strokeLinecap="round" />
      <Line x1="47" y1="17" x2="52.5" y2="11.5" stroke="#FFC978" strokeWidth="3.2" strokeLinecap="round" />
    </Svg>
  );
}

export function CloudIcon() {
  return (
    <Svg width={SIZE} height={SIZE} viewBox="0 0 64 64" fill="none">
      <Path d="M46 44H20a11 11 0 0 1-1.5-21.9A14 14 0 0 1 45 26.4 10 10 0 0 1 46 44Z" fill="#DDE7F5" />
    </Svg>
  );
}

export function CloudSunIcon() {
  return (
    <Svg width={SIZE} height={SIZE} viewBox="0 0 64 64" fill="none">
      <Circle cx="24" cy="22" r="10" fill="#FFC978" />
      <Path d="M44 46H23a10 10 0 0 1-1.4-19.9A12.7 12.7 0 0 1 46 28 9 9 0 0 1 44 46Z" fill="#DDE7F5" />
    </Svg>
  );
}

export function RainIcon() {
  return (
    <Svg width={SIZE} height={SIZE} viewBox="0 0 64 64" fill="none">
      <Path d="M46 34H20a11 11 0 0 1-1.5-21.9A14 14 0 0 1 45 16.4 10 10 0 0 1 46 34Z" fill="#C7D6EC" />
      <Line x1="22" y1="42" x2="19" y2="52" stroke="#8FB6E8" strokeWidth="3" strokeLinecap="round" />
      <Line x1="33" y1="42" x2="30" y2="52" stroke="#8FB6E8" strokeWidth="3" strokeLinecap="round" />
      <Line x1="44" y1="42" x2="41" y2="52" stroke="#8FB6E8" strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
}

export function StormIcon() {
  return (
    <Svg width={SIZE} height={SIZE} viewBox="0 0 64 64" fill="none">
      <Path d="M46 30H20a11 11 0 0 1-1.5-21.9A14 14 0 0 1 45 12.4 10 10 0 0 1 46 30Z" fill="#B7C4DE" />
      <Path d="M34 36 25 50h8l-4 12 15-18h-9l5-8Z" fill="#FFC978" />
    </Svg>
  );
}

export function SnowIcon() {
  return (
    <Svg width={SIZE} height={SIZE} viewBox="0 0 64 64" fill="none">
      <Path d="M46 32H20a11 11 0 0 1-1.5-21.9A14 14 0 0 1 45 14.4 10 10 0 0 1 46 32Z" fill="#DDE7F5" />
      <Line x1="22" y1="42" x2="22" y2="52" stroke="#B9D3F2" strokeWidth="2.6" strokeLinecap="round" />
      <Line x1="17.5" y1="47" x2="26.5" y2="47" stroke="#B9D3F2" strokeWidth="2.6" strokeLinecap="round" />
      <Line x1="32" y1="42" x2="32" y2="52" stroke="#B9D3F2" strokeWidth="2.6" strokeLinecap="round" />
      <Line x1="27.5" y1="47" x2="36.5" y2="47" stroke="#B9D3F2" strokeWidth="2.6" strokeLinecap="round" />
      <Line x1="42" y1="42" x2="42" y2="52" stroke="#B9D3F2" strokeWidth="2.6" strokeLinecap="round" />
      <Line x1="37.5" y1="47" x2="46.5" y2="47" stroke="#B9D3F2" strokeWidth="2.6" strokeLinecap="round" />
    </Svg>
  );
}

export function MistIcon() {
  return (
    <Svg width={SIZE} height={SIZE} viewBox="0 0 64 64" fill="none">
      <Line x1="10" y1="24" x2="54" y2="24" stroke="#DDE7F5" strokeWidth="3.4" strokeLinecap="round" />
      <Line x1="16" y1="34" x2="48" y2="34" stroke="#DDE7F5" strokeWidth="3.4" strokeLinecap="round" />
      <Line x1="10" y1="44" x2="54" y2="44" stroke="#DDE7F5" strokeWidth="3.4" strokeLinecap="round" />
    </Svg>
  );
}

export function iconForCode(code) {
  if (!code) return CloudIcon;
  if (code.startsWith('01')) return SunIcon;
  if (code.startsWith('02') || code.startsWith('03')) return CloudSunIcon;
  if (code.startsWith('04')) return CloudIcon;
  if (code.startsWith('09') || code.startsWith('10')) return RainIcon;
  if (code.startsWith('11')) return StormIcon;
  if (code.startsWith('13')) return SnowIcon;
  if (code.startsWith('50')) return MistIcon;
  return CloudIcon;
}
