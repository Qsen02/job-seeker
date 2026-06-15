export function logoErrorHandler(e: React.SyntheticEvent) {
    const target = e.currentTarget as HTMLImageElement
    target.src = "/images/alt-company-image.jpg";
}