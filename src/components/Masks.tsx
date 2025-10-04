type MaskPropsType = {
    viewBoxWidth: number;
    viewBoxHeight: number;
}

export const BannerMask= ({viewBoxWidth, viewBoxHeight}: MaskPropsType)=>{
    return <svg width="0" height="0" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} xmlns="http://www.w3.org/2000/svg">
        <clipPath id="roundedTabMask" clipPathUnits="objectBoundingBox">
            <path
                d="M0 0H30C13.4315 0 0 13.4315 0 30V847C0 863.568 13.4315 877 30 877H1271C1287.57 877 1301 863.568 1301 847V30C1301 13.4315 1287.57 0 1271 0H942C925.431 0 912 13.4315 912 30V41C912 57.5685 898.568 71 882 71H446.28C429.711 71 416.28 57.5685 416.28 41V30C416.28 13.4315 402.848 0 386.28 0Z"
                transform={`scale(${1 / (viewBoxWidth)}, ${1 / (viewBoxHeight*0.7)})`}
            />
        </clipPath>
    </svg>
}