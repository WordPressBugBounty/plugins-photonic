document.addEventListener('DOMContentLoaded', () => {
	const PhotonicEditor = () => {
		const wizardButton = document.querySelector('#photonic-add-gallery');
		let sourceMessageChannel;
		let nativeMediaLibrary;
		let photonicEditorSelection = '';

		const isBlock = !!(wp.data && wp.data.select('core/block-editor') && document.body.classList.contains('block-editor-page'));
		let isTinyMCE;

		function waitForIFrame() {
			const observer = new MutationObserver(() => {
				let iframe;
				iframe = document.querySelector('#TB_iframeContent');
				if (iframe) {
					iframe.onload = () => {
						isTinyMCE = typeof(tinyMCE) !== "undefined" && tinyMCE.activeEditor !== null && !tinyMCE.activeEditor.isHidden();
						if (!isTinyMCE) {
							sourceMessageChannel = new MessageChannel();
							nativeMediaLibrary = new PhotonicWPNativeUI(sourceMessageChannel);

							sourceMessageChannel.port1.onmessage = (event) => {
								if (event.data.type === 'photonicAddTBClass') {
									document.getElementById('TB_window').classList.add('photonic-tb');
								}
								else if (event.data.type === 'photonicInitializeMediaLibrary') {
									nativeMediaLibrary.initializeMediaLibrary(event.data.mediaOptions, event.data.photonicOptions);
								}
								else if (event.data.type === 'photonicOpenMediaLibrary') {
									nativeMediaLibrary.openMediaLibrary();
								}
								else if (event.data.type === 'photonicUpdateGallery') {
									const win = window.dialogArguments || opener || parent || top;
									win.send_to_editor(event.data.html);
									nativeMediaLibrary.closeTB();
								}
							};

							// First, send a placeholder message to the iFrame and transfer port2 to it
							iframe.contentWindow.postMessage('init', '/', [sourceMessageChannel.port2]);

							// Second, send the actual shortcode
							sourceMessageChannel.port1.postMessage({
								type: 'photonicShortcode',
								object: parseEditorSelection(photonicEditorSelection),
							});
						}
					};
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		}

		if (!isBlock) {
			waitForIFrame();
		}

		if (wizardButton) {
			wizardButton.addEventListener('click', e => {
				const textArea = document.querySelector('textarea#content');
				const start = textArea.selectionStart;
				const end = textArea.selectionEnd;
				photonicEditorSelection = textArea.value.substring(start, end);
			});
		}

		function parseEditorSelection(selection) {
			if (selection !== '' && top.wp !== undefined && top.wp.shortcode !== undefined) {
				let shortcode = top.wp.shortcode.next(Photonic_Editor_JS.shortcode, selection.trim());
				let moreShortcode = top.wp.shortcode.next(Photonic_Editor_JS.shortcode, selection.trim(), 1); // Only one shortcode at a time

				if (shortcode !== undefined && moreShortcode === undefined && shortcode.content.length === selection.trim().length) { // Selection is a valid shortcode
					return {
						shortcode: shortcode
					}
				}
				else { // Selection is not a valid shortcode
					return {
						shortcode: null,
						error: 'Not a shortcode'
					}
				}
			}
			else if (selection === '') { // Selection is blank
				return {
					shortcode: ''
				}
			}
			return null;
		}
	};

	PhotonicEditor();
});
