export default function sortBy(arrToSort, sortBy) {
    return arrToSort.sort((a, b) => {
        if(a[sortBy] > b[sortBy])
        return 1
        else if(a[sortBy] < b[sortBy])
        return -1
        else return 0
    })
}