export function Flag({ isoCode, label }: { isoCode: string; label?: string }) {
  return (
    <img
      src={`https://flagcdn.com/24x18/${isoCode}.png`}
      srcSet={`https://flagcdn.com/48x36/${isoCode}.png 2x`}
      width={24}
      height={18}
      alt={label ?? isoCode}
      className="inline-block rounded-[2px] align-middle"
    />
  );
}