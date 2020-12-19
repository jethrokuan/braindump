(require 'find-lisp)

(defun jethro/publish (file)
  (with-current-buffer (find-file-noselect file)
    (projectile-mode -1)
    (dtrt-indent-mode -1)
    (setq org-hugo-base-dir "..")
    (let ((org-id-extra-files (find-lisp-find-files org-roam-directory "\.org$")))
      (org-hugo-export-wim-to-md))))
