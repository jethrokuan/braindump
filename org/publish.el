(setq straight-dirs '("~/.emacs.d/.local/straight/build/"
                      "~/.emacs.d/.local/straight/repos/"))

(dolist (path '("org-mode"
                "org-roam"
                "org-ref"
                "htmlize"
                "dash"
                "f"
                "s"
                "emacsql"
                "emacsql-sqlite3"
                "hydra"
                "lv"
                "parsebib"
                "helm"
                "async"
                "helm-bibtex"
                "biblio"
                "biblio-core"
                "queue"
                ;; "citeproc"
                ;; "citeproc-org"
                ))
  (dolist (dir straight-dirs)
    (add-to-list 'load-path (concat dir path))))

(require 'org)
(require 'ox-publish)
(require 'ox-html)
(require 'org-roam)
(require 'org-ref)
;; (require 'citeproc-org-setup)

;; (citeproc-org-setup)
(setq org-roam-directory "~/Dropbox/org/braindump/org/")
(setq org-roam-db-location "~/org-roam.db")
(setq org-id-extra-files (org-roam--list-all-files))
(setq org-html-with-latex 'dvipng)
(setq make-backup-files nil)

(setq braindump/project-dir "~/Dropbox/org/braindump/org/")
(setq braindump/publish-dir (expand-file-name "output" braindump/project-dir))
(setq braindump/publish-url "https://braindump.jethro.dev/")

(setq braindump/preamble "<div><a href='/'>Jethro's Braindump</a></div>")
(setq braindump/postamble "This page last updated: %C.<a href='sitemap.html'>Index</a>.")
(setq braindump/head-extra "<link rel='stylesheet' type='text/css' href='css/stylesheet.css'/>
<link href='https://unpkg.com/tippy.js@6.2.3/themes/light.css' rel='stylesheet'>
<script src='https://unpkg.com/@popperjs/core@2'></script>
<script src='https://polyfill.io/v3/polyfill.min.js?features=es6'></script>
<script id='MathJax-script' async src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'></script>
<script src='js/URI.js'></script>
<script src='js/page.js'></script>
<script src='https://unpkg.com/@popperjs/core@2'></script>
<script src='https://unpkg.com/tippy.js@6'></script>")

(toggle-debug-on-error)
(setq org-babel-load-languages '((emacs-lisp . t)
                                 (python . t)
                                 (dot . t)
                                 (R . t)
                                 (sh . t)))
(setq org-html-with-latex t)
(setq org-publish-project-alist
      `(("braindump"
         :components ("braindump-notes" "braindump-static"))
        ("braindump-notes"
         :base-directory ,braindump/project-dir
         :base-extension "org"
         :publishing-directory ,braindump/publish-dir
         :publishing-function org-html-publish-to-html
         :recursive t
         :headline-levels 4
         :with-toc nil
         :html-doctype "html5"
         :html-html5-fancy t
         :html-preamble ,braindump/preamble
         :html-postamble ,braindump/postamble
         :html-head-include-scripts nil
         :html-head-include-default-style nil
         :html-head-extra ,braindump/head-extra
         :html-container "section"
         :htmlized-source nil
         :auto-sitemap t
         :sitemap-title "All pages"
         )
        ("braindump-static"
         :base-directory ,braindump/project-dir
         :base-extension "css\\|js\\|png\\|jpg\\|gif\\|svg\\|pdf"
         :publishing-directory ,braindump/publish-dir
         :recursive t
         :publishing-function org-publish-attachment)))


(defun ngm/org-roam--backlinks-list (file)
  (if (org-roam--org-roam-file-p file)
      (--reduce-from
       (concat acc (format "- [[file:%s][%s]]\n"
                           (file-relative-name (car it) org-roam-directory)
                           (org-roam--get-title-or-slug (car it))))
       "" (org-roam-db-query [:select [from] :from links :where (= to $s1)] file))
    ""))

(defun ngm/org-export-preprocessor (backend)
  (let ((links (ngm/org-roam--backlinks-list (buffer-file-name))))
    (unless (string= links "")
      (save-excursion
        (goto-char (point-max))
        (insert (concat "\n* Backlinks\n") links)))))

(add-hook 'org-export-before-processing-hook 'ngm/org-export-preprocessor)

(eval-after-load "ox-html"
  '(defun org-html-template (contents info)
     (concat (org-html-doctype info)
             "<html lang=\"en\">
                <head>"
             (org-html--build-meta-info info)
             (org-html--build-head info)
             (org-html--build-mathjax-config info)
             "</head>
                <body>"
             (org-html--build-pre/postamble 'preamble info)
             "<div class='grid-container'><div class='grid'>"
             (unless (string= (org-export-data (plist-get info :title) info) "The Map")
               "<div class='page'>")
             ;; Document contents.
             (let ((div (assq 'content (plist-get info :html-divs))))
               (format "<%s id=\"%s\">\n" (nth 1 div) (nth 2 div)))
             ;; Document title.
             (when (plist-get info :with-title)
               (let ((title (and (plist-get info :with-title)
                                 (plist-get info :title)))
                     (subtitle (plist-get info :subtitle))
                     (html5-fancy (org-html--html5-fancy-p info)))
                 (when title
                   (format
                    (if html5-fancy
                        "<header>\n<h1 class=\"title\">%s</h1>\n%s</header>"
                      "<h1 class=\"title\">%s%s</h1>\n")
                    (org-export-data title info)
                    (if subtitle
                        (format
                         (if html5-fancy
                             "<p class=\"subtitle\">%s</p>\n"
                           (concat "\n" (org-html-close-tag "br" nil info) "\n"
                                   "<span class=\"subtitle\">%s</span>\n"))
                         (org-export-data subtitle info))
                      "")))))
              contents
              (format "</%s>\n" (nth 1 (assq 'content (plist-get info :html-divs))))
              "</div></div>"
              "</div>"
             (org-html--build-pre/postamble 'postamble info)
             "</body>
              </html>")))

(defun ngm/republish ()
	(let ((current-prefix-arg 4))
  (call-interactively 'org-publish-all)))
