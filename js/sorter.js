/*
 * Returns a random integer between min (inclusive) and max (exclusive)
 */
function getRandomInt(min, max) {
	let r = Math.random();
	return Math.floor(Math.random() * (max - min) + min);
}

/*
 * This function shuffles an array into a random order.
 */
function shuffle(a) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
}

/*
 * This function generates an array of increasing integers of length n,
 * with values from 1 to n.
 */
function generateIncreasingArray(n) {
	a = [...Array(n + 1).keys()].slice(1, n + 1);
	return a;
}

/*
 * This function generates an array of increasing integers of length n.
 */
function generateDecreasingArray(n) {
	let a = generateIncreasingArray(n);
	a.reverse();
	return a;
}


/*
 * This function generates an array of random integers of length n.
 */
function generateRandomArray(n) {
	let a = generateIncreasingArray(n);
	shuffle(a);
	return a;
}

/*
 * This function generates an array of *almost* sorted integers of length n.
 * There are about log(n) pairs that are swapped out of order.
 */
function generateAlmostSortedArray(n) {
	let a = generateIncreasingArray(n);

	let index;
	for (let i = 0; i < Math.log(a.length); i++) {
		index = getRandomInt(0, n - 1);
		swap(a, index, index + 1);
	}
	return a;
}

/*
 * This function returns the left-most index between left and
 * right.
 */
function getLeftPivot(array, left, right) {
	return left;
}

/*
 * This function returns the right-most index between left and
 * right.
 */
function getRightPivot(array, left, right) {
	return right;
}

/*
 * This function returns a random index between left and right.
 */
function getRandomPivot(array, left, right) {
	return getRandomInt(left, right);
}

/*
 * This function returns the integer midpoint between left and 
 * right.
 */
function getMidpointPivot(array, left, right) {
	let midpoint = (left + right) / 2;
	midpoint = Math.round(midpoint);
	return midpoint;
}

/* 
 * This function finds three values: the left-most element, the
 * right-most element, and the center element, and finds the median 
 * of them, and then returns the index of that median. 
 */
function getMedianOfThreePivot(array, left, right) {
	let mid = getMidpointPivot(array, left, right);

	// create list of three potential pivots
	let list = [array[left], array[mid], array[right]];

	// sort it
	list.sort();
	let median = list[1];

	if (array[left] === median) {
		return left;
	} else if (array[right] === median) {
		return right;
	} else {
		return median;
	}
}

/*
 * This function swaps elements at indices i and j in the provided array.
 */
function swap(array, i, j) {
	let temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}

/**
 * Sort the portion of the array between the left and right indices using a quicksort algorithm
 *
 * @param pivotFunction, function to find pivot
 * @param array, array to sort
 * @param left, left index
 * @param right, right index
 * @returns fully sorted array
 */
function quicksort(pivotFunction, array, left, right) {
	// sets left value as zero if no value was given
	left = left || 0;

	// sets right value as the index of the last element in the array if no value was given
	right = right || array.length - 1;

	// calls partition function to get the index of the pivot
	const pivot = partition(pivotFunction, array, left, right);

	// update the visual by passing the new parameters
	displayProgress(array, left, right, pivot)

	// if the left index is less than the index of the first element smaller than the pivot
	// quick sort is called on the subarray from the left value to one less than the pivot
	if (left < pivot - 2) {
		quicksort(pivotFunction, array, left, pivot - 2);
	}

	// if the right index is greater than the index of the first element to the right of the pivot point
	// quick sort is called on the subarray
	if (right > pivot) {
		quicksort(pivotFunction, array, pivot, right);
	}

	// return fully sorted array
	return array;
}

/**
 * The partition function finds the pivotValue in the array. It then finds the index of the element that
 * is less than the pivot point and the element greater than the pivot point. These elements are then swapped and
 * then the original left index is swapped with the left index found.
 *
 * @param pivotFunction, the function to get the pivot value based on user input
 * @param array, the array to sort
 * @param left, the left index
 * @param right, the right index
 * @returns the left index one past the "middle"
 */
function partition(pivotFunction, array, left, right) {
	let originalLeft = left;

	// get pivot based on the users pivot choice
	let pivot = pivotFunction(array, originalLeft, right);
	// get the value pivot from the array
	let pivotValue = array[pivot];

	// swaps the pivot element with the originalLeft element
	swap(array, pivot, originalLeft);
	// increments left
	left++;

	// while loop iterates until left index is greater than or equal than the right index
	while (left <= right) {

		// increment left index until we find a value less than the pivotValue
		while (array[left] < pivotValue) {
			left++;
		}

		// decrease right index until we find a value greater than the pivotValue
		while (array[right] > pivotValue) {
			right--;
		}

		// swaps elements at right and left index if the left hasn't crossed over the right
		if (left <= right) {
			swap(array, left, right);
			left++;
			right--;
		}
	}

	// swap the original left value with the value at the final left index
	swap(array, originalLeft, left - 1);

	// return the left index one past the "middle"
	return left;
}
