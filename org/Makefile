.PHONY: all publish publish_no_init

all: publish

publish: publish.el
	@echo "Publishing... with current Emacs configurations."
	emacs -q --batch --load publish.el --funcall org-publish-all

republish: publish.el
	@echo "Publishing... with current Emacs configurations."
	emacs -q --batch --load publish.el --funcall ngm/republish

clean:
	@echo "Cleaning up.."
	@rm -rvf *.elc
	@rm -rvf public
	@rm -rvf ~/.org-timestamps/*
