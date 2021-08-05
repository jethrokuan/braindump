(require 'find-lisp)

(projectile-mode -1)
(dtrt-indent-mode -1)
(recentf-mode -1)

(defun jethro/publish (file)
  (with-current-buffer (find-file-noselect file)
    (setq org-hugo-base-dir "..")
    (let ((org-id-extra-files (find-lisp-find-files org-roam-directory "\.org$")))
      (org-hugo-export-wim-to-md))))
