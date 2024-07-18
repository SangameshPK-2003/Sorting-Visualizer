export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  //function to add animations for quick sort

  export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(mainArray, startIdx, endIdx, animations) {
    if (startIdx < endIdx) {
      const pivotIdx = partition(mainArray, startIdx, endIdx, animations);
      quickSortHelper(mainArray, startIdx, pivotIdx - 1, animations);
      quickSortHelper(mainArray, pivotIdx + 1, endIdx, animations);
    }
  }
  
  function partition(mainArray, startIdx, endIdx, animations) {
    const pivot = mainArray[endIdx];
    let i = startIdx;
    for (let j = startIdx; j < endIdx; j++) {
      animations.push(['compare', j, endIdx]);
      animations.push(['compare', j, endIdx]);
      if (mainArray[j] < pivot) {
        animations.push(['swap', i, mainArray[j]]);
        animations.push(['swap', j, mainArray[i]]);
        swap(mainArray, i, j);
        i++;
      }
    }
    animations.push(['swap', i, mainArray[endIdx]]);
    animations.push(['swap', endIdx, mainArray[i]]);
    swap(mainArray, i, endIdx);
    return i;
  }
  
  function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  
  //Function for heap sort
  export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSortHelper(array, animations);
    return animations;
  }
  
  function heapSortHelper(array, animations) {
    const n = array.length;
  
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i, animations);
    }
  
    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
      animations.push(['swap', 0, i]);
      animations.push(['swapHeight', 0, array[i]]);
      animations.push(['swapHeight', i, array[0]]);
      swap(array, 0, i);
      heapify(array, i, 0, animations);
    }
  }
  
  function heapify(array, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
  
    if (left < n) {
      animations.push(['compare', i, left]);
      if (array[left] > array[largest]) {
        largest = left;
      }
    }
  
    if (right < n) {
      animations.push(['compare', i, right]);
      if (array[right] > array[largest]) {
        largest = right;
      }
    }
  
    if (largest !== i) {
      animations.push(['swap', i, largest]);
      animations.push(['swapHeight', i, array[largest]]);
      animations.push(['swapHeight', largest, array[i]]);
      swap(array, i, largest);
      heapify(array, n, largest, animations);
    }
  }
  