<?php

namespace Photonic_Plugin\Components;

use Photonic_Plugin\Layouts\Core_Layout;
use Photonic_Plugin\Platforms\Base;

class Comment implements Printable {
	private string $message;

	/**
	 * Error constructor.
	 *
	 * @param String $message
	 */
	public function __construct(string $message) {
		$this->message = $message;
	}

	/**
	 * {@inheritDoc} - an Error
	 */
	public function html(Base $module, ?Core_Layout $layout, bool $print = false): string { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter
		$ret = "
<!-- 
	{$this->message}
-->\n";
		if ($print) {
			echo wp_kses_post($ret);
		}

		return wp_kses_post($ret);
	}
}
