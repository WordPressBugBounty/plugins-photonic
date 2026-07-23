<?php

namespace Photonic_Plugin\Components;

class Photo {
	public string $id = '';
	public string $thumbnail = '';
	public string $tile_image = '';
	public string $main_image = '';
	public string $download = '';

	public string $title = '';
	public string $alt_title = '';
	public string $description = '';

	public string $video = '';
	public string $mime = '';

	public array $thumb_size = [];
	public array $tile_size = [];
	public array $main_size = [];

	public string $taken_on = '';
	public string $uploaded_on = '';

	public string $main_page = '';
	public string $buy_link = '';
}
