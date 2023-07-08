import { httpService } from './http.service.js'
import _ from 'lodash'


export default {
    queryByLabels,
    getAvgLabelPrice,
    getInStockByLabel
}

function queryByLabels() {
    return httpService.get('toy').then(({ filteredToys: toys }) => {
        const labelMap = {}
        toys.forEach(toy => {
            toy.labels.forEach(label => {
                labelMap[label] = labelMap[label] ?
                    [...labelMap[label], toy] : [toy]

            })
        })
        return labelMap
    })
}

function getAvgLabelPrice() {
    return queryByLabels().then(labelMap => {
        const avgMap = {}
        for (const label in labelMap) {
            avgMap[label] = _.meanBy(labelMap[label], 'price')
        }
        return avgMap
    })
}

function getInStockByLabel() {
    return queryByLabels().then(labelMap => {
        const inStockMap = {}
        for (const label in labelMap) {
            inStockMap[label] = labelMap[label].reduce(
                (acc, toy) => acc += toy.inStock ?
                    1 / labelMap[label].length * 100 : 0, 0)
        }
        return inStockMap
    })

}


