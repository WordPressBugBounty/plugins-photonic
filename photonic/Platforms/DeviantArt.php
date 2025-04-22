<?php
namespace Photonic_Plugin\Platforms;

use Photonic_Plugin\Components\Album_List;
use Photonic_Plugin\Components\Error;
use Photonic_Plugin\Components\Pagination;
use Photonic_Plugin\Components\Photo_List;
use Photonic_Plugin\Core\Photonic;
use Photonic_Plugin\Components\Album;
use Photonic_Plugin\Components\Photo;

require_once 'OAuth2.php';
require_once 'Level_One_Module.php';
require_once 'Level_Two_Module.php';
require_once 'Pageable.php';

/**
 * Fetches photos from a user's Google Photos account.
 * Lacks support for dual title / description fields, doesn't provide download URLs, and video support is ambiguous.
 */
class DeviantArt extends OAuth2 implements Level_One_Module, Level_Two_Module, Pageable {
	protected function __construct() {
		parent::__construct();
		global $photonic_deviantart_client_id, $photonic_deviantart_client_secret, $photonic_deviantart_refresh_token;

		if (!empty($photonic_deviantart_client_id) && !empty($photonic_deviantart_client_secret)) {
			$this->client_id     = trim($photonic_deviantart_client_id);
			$this->client_secret = trim($photonic_deviantart_client_secret);
		}

		$this->provider            = 'deviantart';
		$this->oauth_version       = '2.0';
		$this->response_type       = 'code';
		$this->scope               = 'basic';
		$this->link_lightbox_title = false; // empty($photonic_google_disable_title_link);

		$this->oauth_done        = false;
	}

	public function get_gallery_images($attr = []): array {
		// TODO: Implement get_gallery_images() method.
	}

	public function build_level_1_objects($response, array $short_code, $module_parameters = [], $options = []): array {
		// TODO: Implement build_level_1_objects() method.
	}

	public function build_level_2_objects($objects_or_response, array $short_code, array $filter_list = [], array &$options = [], Pagination &$pagination = null): array {
		// TODO: Implement build_level_2_objects() method.
	}

	public function authentication_URL() {
		return 'https://www.deviantart.com/oauth2/authorize';
	}

	public function access_token_URL() {
		return 'https://www.deviantart.com/oauth2/token';
	}

	public function renew_token($token) {
		// TODO: Implement renew_token() method.
	}

	protected function set_token_validity($validity) {
		// TODO: Implement set_token_validity() method.
	}

	public function is_token_expiring_soon($soon_limit) {
		// TODO: Implement is_token_expiring_soon() method.
	}

	public function get_pagination($entity, array $short_code = []): Pagination {
		// TODO: Implement get_pagination() method.
	}
}
