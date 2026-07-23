<?php
namespace Photonic_Plugin\Components;

class Pagination {
	/**
	 * @var int $start Index of the first element of the current dataset, relative to the total dataset; >= 1
	 */
	public int $start = -1;

	/**
	 * @var int $end Index of the last element of the current dataset, relative to the total dataset; <= $total
	 */
	public int $end = -1;

	/**
	 * @var int $total Total number of elements in the current dataset. A value greater than -1 implies that the platform has set the total.
	 */
	public int $total = -1;

	/**
	 * @var int $per_page Items attempted to fetch for the current dataset; $per_page >= $end - $start + 1
	 */
	public int $per_page = 500;

	/**
	 * @var string $next_token Token to fetch next data set; some platforms use this instead of defining hard counts
	 */
	public string $next_token = '';
}
