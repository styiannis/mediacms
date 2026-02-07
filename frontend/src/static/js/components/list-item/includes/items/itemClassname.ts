export function itemClassname(
    defaultClassname: string,
    inheritedClassname: string,
    isActiveInPlaylistPlayback: boolean
) {
    let classname = defaultClassname;

    if ('' !== inheritedClassname) {
        classname += ' ' + inheritedClassname;
    }

    if (isActiveInPlaylistPlayback) {
        classname += ' pl-active-item';
    }

    return classname;
}
